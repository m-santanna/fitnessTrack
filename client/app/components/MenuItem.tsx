import Link from 'next/link'
import React from 'react'

interface MenuItemProps {
  name: string
  a: string
  badge?: string
}

function MenuItem({ name, a, badge }: MenuItemProps) {
  return (
    <li>
      <Link className="justify-between" href={a}>
        {name}
        {badge && <span className="badge">{badge}</span>}
      </Link>
    </li>
  )
}

export default MenuItem
