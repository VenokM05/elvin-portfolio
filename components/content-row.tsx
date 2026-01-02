import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { RowCard } from "./row-card"

interface ContentItem {
  id: string
  title: string
  category: string
  image: string
}

interface ContentRowProps {
  title: string
  items: ContentItem[]
}

export function ContentRow({ title, items }: ContentRowProps) {
  return (
    <section className="relative py-6 md:py-8 pl-4 md:pl-8 lg:pl-16 overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight transition-all duration-300 hover:text-muted-foreground cursor-pointer inline-flex items-center gap-2">
        {title}
        <span className="text-xs text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
          Explore All
        </span>
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full group/carousel"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <RowCard {...item} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity flex items-center pointer-events-none">
          <CarouselPrevious className="relative left-2 pointer-events-auto border-none bg-transparent hover:bg-transparent hover:scale-125 transition-transform" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity flex items-center justify-end pointer-events-none">
          <CarouselNext className="relative right-2 pointer-events-auto border-none bg-transparent hover:bg-transparent hover:scale-125 transition-transform" />
        </div>
      </Carousel>
    </section>
  )
}
