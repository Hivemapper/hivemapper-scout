import React from "react";
import Header from "@components/hivemapper/ui/Header";
import Filters from "@components/hivemapper/ui/Filters";
import List from "@components/hivemapper/ui/List";
import { ListType } from "types/list";
import { ScoutLocation } from "types/location";

export interface InfoListProps {
  locations: ScoutLocation[];
  children?: React.ReactNode;
}

const InfoList: React.FC<InfoListProps> = ({ locations }) => {
  return (
    <>
      <Header />
      <Filters />
      <List locations={locations} type={ListType.Info} />
    </>
  );
};

export default InfoList;
