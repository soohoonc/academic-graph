import { getServerAuthSession } from '@/server/auth';

const AuthorPage = async () => {
  const session = await getServerAuthSession();
  return (
    <div>AuthorPage by {session?.user?.email}</div>
  )
}

export default AuthorPage