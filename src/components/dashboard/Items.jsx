import React, { useState, useEffect } from "react";
import CardSortable from "./CardSortable";
import CardHidden from "./CardHidden";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import sortOrderTokens from "../../utils/sortOrderTokens";
import saveLayout from "../../data/dashboard/saveLayout";
import { environment } from "../../utils/environment";
import Actions from "./Actions";
import update from "immutability-helper";
import { error } from "../../utils/error";
import { success } from "../../utils/success";

export default function Items(props) {
  const [tokens, setTokens] = useState([]);
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
    // Add an id for react-dnd
    setTokens([]);
    sortOrderTokens(props.nfts).then((t) => {
      for (let i = 0; i < t.length; i += 1) {
        t[i].id = i;
      }
      setTokens(t);
    });
  }, [props.nfts]);

  return (
    <>
      <Actions
        handleSave={handleSave}
        toggleVisibility={toggleVisibility}
        handleRefresh={props.handleRefresh}
      />
      <div>
        <>
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">
            Visible
          </h2>
          <div className="max-w-2xl mx-auto py-0 px-4 sm:px-6 lg:max-w-7xl lg:px-0 lg:py-0">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-4">
              <DndProvider backend={HTML5Backend} key={updates}>
                {tokens.map((token, index) => {
                  if (token.visible === true) {
                    return (
                      <CardSortable
                        key={token.id}
                        index={index}
                        id={token.id}
                        token={token}
                        moveCard={moveCard}
                        toggleVisibilityOne={toggleVisibilityOne}
                      />
                    );
                  }
                })}
              </DndProvider>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight mb-3 pt-4">
            Hidden
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-4">
            {tokens.map((token, index) => {
              if (token.visible === false) {
                return (
                  <CardHidden
                    key={token.id}
                    token={token}
                    toggleVisibilityOne={toggleVisibilityOne}
                  />
                );
              }
            })}
          </div>
        </>
      </div>
    </>
  );

  async function toggleVisibility(vis) {
    // set metadata visibility
    for (let i = 0; i < tokens.length; i += 1) {
      tokens[i].visible = vis;
    }
    setTokens(resetIds(tokens));
    setUpdates(updates + 1);
  }

  async function toggleVisibilityOne(vis, mint) {
    // set metadata visibility
    let mint_id;
    for (let i = 0; i < tokens.length; i += 1) {
      if (tokens[i].mint === mint) mint_id = i;
    }
    let new_el = tokens[mint_id];
    new_el.visible = vis;
    tokens.splice(mint_id, 1);

    if (vis === true) {
      tokens.push(new_el);
    } else {
      tokens.unshift(new_el);
    }
    setTokens(resetIds(tokens));
    setUpdates(updates + 1);
  }

  function resetIds(tkns) {
    let dndId = 0;
    for (let i = 0; i < tkns.length; i += 1) {
      if (tkns[i].visible === true) {
        tkns[i].id = dndId;
        tkns[i].order_id = dndId + 1;
        dndId += 1;
      }
    }
    for (let i = 0; i < tkns.length; i += 1) {
      if (tkns[i].visible !== true) {
        tkns[i].id = dndId;
        tkns[i].order_id = dndId + 1;
        dndId += 1;
      }
    }
    return tkns;
  }

  async function handleSave() {
    let apiKey = localStorage.getItem(environment + "_api_key");
    saveLayout(apiKey, tokens)
      .then((res) => {
        if (res.data.status === "error") {
          error(res.data.msg);
        } else {
          success("Layout saved");
        }
      })
      .catch((err) => {
        error("An error has occurred");
      });
  }

  async function moveCard(dragIndex, hoverIndex) {
    const dragCard = tokens[dragIndex];
    setTokens(
      update(tokens, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
    let drag_order_id = tokens[dragIndex].order_id;
    let hover_order_id = tokens[hoverIndex].order_id;

    tokens[dragIndex].order_id = hover_order_id;

    if (drag_order_id > hover_order_id) {
      let new_id = hover_order_id + 1;
      for (let i = 0; i < tokens.length; i += 1) {
        if (tokens[i].visible !== true) continue;
        if (tokens[i].order_id <= hover_order_id) continue;
        new_id += 1;
        tokens[i].order_id = new_id;
      }
    } else {
      let new_id = 1;
      for (let i = 0; i < tokens.length; i += 1) {
        if (tokens[i].visible !== true) continue;
        if (tokens[i].order_id >= hover_order_id) continue;
        tokens[i].order_id = new_id;
        new_id += 1;
      }
    }

    tokens[dragIndex].order_id = hover_order_id;
    let target_new_id =
      drag_order_id > hover_order_id ? hover_order_id + 1 : hover_order_id - 1;
    tokens[hoverIndex].order_id = target_new_id;
  }
}
