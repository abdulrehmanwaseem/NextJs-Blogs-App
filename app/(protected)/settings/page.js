import { currentUser } from "@/lib/utils";
import Settings from "./settings";

const SettingsPage = async () => {
  const user = await currentUser();
  return <Settings user={user} />;
};

export default SettingsPage;
