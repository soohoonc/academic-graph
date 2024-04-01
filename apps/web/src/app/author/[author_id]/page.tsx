import { getServerAuthSession } from "@/server/auth";

const AuthorPage = async () => {
  const session = await getServerAuthSession();
  const author = null;
  return (
    <div>
      Author: {author} email: {session?.user?.email}{" "}
    </div>
  );
};

export default AuthorPage;
