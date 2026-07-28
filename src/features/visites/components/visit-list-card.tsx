import { Visitor } from "@/utils/types";

type visitListCardProps = {
  visites: Visitor[];
};

const VisitListCard = ({ visites }: visitListCardProps) => {
  return (
    <div className="flex bg-gray-500 p-2">
      {visites.map((visit) => (
        <>
          <p>{visit.motif}</p>
        </>
      ))}
    </div>
  );
};

export default VisitListCard;
