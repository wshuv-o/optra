import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex space-x-4 py-4 bg-gray-100">
      <Link href="/search/companies" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        Companies
      </Link>
      <Link href="/search/persons" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        Persons
      </Link>
      <Link href="/search/investors" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        Investors
      </Link>
      <Link href="/search/acquisitions" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        Acquisitions
      </Link>
      <Link href="/search/funding-rounds" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        Funding Rounds
      </Link>
    </nav>
  )
}

export default Navbar
