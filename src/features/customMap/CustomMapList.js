import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import getCustomMapList from "../../common/api/getCumstomMap";
import ButtonCustomMap from "../../common/components/buttons/ButtonCustomMap";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import NameCardDefault from "../../common/components/nameCard/NameCardDefault";
import Pagination from "../../common/components/pagenation/Pagenation";
import { COLOR } from "../../common/util/constants";

const StyledCustomMapList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 98vh;

  .customMapListContainer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    overflow: auto;
    width: 80%;
    height: 70%;
    margin-top: 1rem;
    border: 0.4rem solid black;
    border-radius: 4rem;
    background-color: ${COLOR.BROWN};
  }

  .customMapContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 4.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    border: 0.2rem solid black;
    border-radius: 2rem;
    margin: 1rem 4rem;
    background-color: ${COLOR.DARK_BROWN};
  }

  .options {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
  }
`;

function CustomMapList() {
  const navigate = useNavigate();
  const [customMapList, setCustomMapList] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    (async () => {
      setCustomMapList(await getCustomMapList());
    })();
  }, []);

  return (
    <StyledCustomMapList>
      <NameCardDefault>Map List</NameCardDefault>
      <div className="customMapListContainer">
        {customMapList &&
          customMapList
            .slice(offset, offset + limit)
            .map((customMap) => (
              <ButtonCustomMap customMap={customMap} key={customMap._id} />
            ))}
      </div>
      <div className="options">
        <footer>
          <Pagination
            total={customMapList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
        <ButtonFluid
          onClick={() => {
            navigate(-1);
          }}
        >
          나가기
        </ButtonFluid>
      </div>
    </StyledCustomMapList>
  );
}

export default CustomMapList;
