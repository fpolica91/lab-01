import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      <h1>Hello World</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      <a href="/api/auth/logout">
        logout
      </a>
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async  ({ req, res }) => {

    const token = await getAccessToken(req, res)
    console.log(token)

    return {
      props: {}
    }
  }
});