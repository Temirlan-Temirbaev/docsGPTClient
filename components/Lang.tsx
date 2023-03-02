import Link from "next/link"
export const Lang = ({lang} : any) => {
    return <Link href={`lang/${lang._id}`}  className="lang">
      <h1 className="lang__name">{lang.name.charAt(0).toUpperCase() + lang.name.slice(1)}</h1>
      <h3 className="lang__description">{lang.description}</h3>
    </Link>
}