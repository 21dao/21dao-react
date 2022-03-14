import { signOut } from "../utils/signOut";

export default function SignoutButton(props) {
  return (
    <button
      className="text-gray-200 py-2 px-3 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
