import type { NextPage } from 'next'
import {Converter } from "../components"

const Home: NextPage = () => {
  return (
    <div className="bg-gray-200 flex h-screen justify-center items-center">
      <Converter />
    </div>
  )
}

export default Home
