import { getServerAuthSession } from "@/server/auth"

const UserPage = async () => {
  const session = await getServerAuthSession();
  return (
    <div>UserPage {session?.user?.email}</div>
  )
}

export default UserPage