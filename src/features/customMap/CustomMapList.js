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
  height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .customMapListContainer {
    width: 80%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    overflow: auto;
    background-color: ${COLOR.BROWN};
    border: 0.4rem solid black;
    border-radius: 4rem;
    margin-top: 1rem;
  }

  .customMapContainer {
    width: 40%;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: ${COLOR.DARK_BROWN};
    border: 0.2rem solid black;
    border-radius: 2rem;
    margin: 1rem 4rem;
  }

  .options {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
