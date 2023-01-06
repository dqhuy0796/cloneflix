import ContentList from "~/components/partial/ContentList";

function PreviewDetails({ data }) {
    return (
        <div className="flex flex-col gap-y-2 mb-2 capitalize">
            {data.created_by && <ContentList title={"Producted by"} data={data.created_by} max={5} />}
            {data.production_companies && <ContentList title={"Created by"} data={data.production_companies} max={5} />}
            {data.production_countries && <ContentList title={"Countries"} data={data.production_countries} max={5} />}
            {data.genres && data.genres && <ContentList title={"Genres"} data={data.genres} max={5} />}
        </div>
    );
}

export default PreviewDetails;
