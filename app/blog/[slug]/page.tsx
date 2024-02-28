import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { format } from 'date-fns';

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
          publishedAt,
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  const formattedDate = format(new Date(data.publishedAt), 'MMMM do, yyyy'); 
  return (
    <div className="mt-8">
      <h1>
        
        <span className="block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
        <div className="mt-3 flex justify-between">
          <div className="text-base text-primary font-semibold tracking-wide uppercase">
            Madhurjya Bora
          </div>
          <div>{formattedDate}</div>
        </div>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 mb-10 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
