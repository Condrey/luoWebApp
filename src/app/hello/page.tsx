export default async function Page() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // throw Error('Bazinga')
    return <div>Hello, James</div>
}

export const metadata = {
  title: "hello-Luo app"
}
