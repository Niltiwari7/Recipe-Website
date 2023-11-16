import React from "react";
import { Link } from "react-router-dom";

const Listingitem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow-300 overflow-hidden rounded-lg w-full  md:w-[330px] m-3">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing Image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3">
            <p className="text-lg font-semibold text-[#333333] truncate">{listing.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Listingitem;
