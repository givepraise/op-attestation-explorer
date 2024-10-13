import { EAS_SCHEMAS } from "../../config";
import Link from "next/link";

type SchemaButtonsProps = {
  slug?: string;
};

export default function SchemaButtons({ slug }: SchemaButtonsProps) {
  const className = (_slug?: string) => {
    let mark = "";
    if (_slug === slug) {
      mark = "ring-4 ring-theme-3 ring-opacity-40";
    }
    return `px-3 py-2 cursor-pointer shadow-theme-shadow-1 rounded-xl hover:ring-4 whitespace-nowrap hover:ring-theme-3 hover:ring-opacity-40 ${mark}`;
  };

  return (
    <div className="flex flex-wrap w-full gap-5 p-2 overflow-scroll md:p-0 md:overflow-visible">
      <Link href="/1">
        <div className={className()}>All</div>
      </Link>
      {EAS_SCHEMAS.map((schema) => (
        <Link href={`/name/${schema.slug}/1`} key={schema.slug}>
          <div key={schema.slug} className={className(schema.slug)}>
            {schema.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
