import React from "react";
import styled from "styled-components";

// import ButtonDefault from "../common/components/buttons/ButtonDefault";
// import ButtonFluid from "../common/components/buttons/ButtonFluid";
// import Input from "../common/components/inputs/Input";
// import NameCardDefault from "../common/components/nameCard/NameCardDefault";
// import NameCardPlayerInfo from "../common/components/nameCard/NameCardPlayerInfo";
// import NameCardSmall from "../common/components/nameCard/NameCardSmall";
// import Node from "../common/components/node/Node";
import ButtonSmall from "../common/components/buttons/ButtonSmall";
import Modal from "../common/components/modal/Modal";
// import Title from "../common/components/title/Title";
// import { COLOR } from "../common/util/constants";

const Styled = styled.div`
  .buttonsContainer {
    width: 100%;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
`;

function sample() {
  return (
    <Styled>
      <div>
        {/* <Title />
      <br />
      <ButtonDefault>여기에 내용</ButtonDefault>
      <Input label="여기에 라벨" inputTitle="여기에 인풋 타이틀" /> */}
        <Modal>
          <>
            <div>정말로 나가시겠습니까?</div>
            <div className="buttonsContainer">
              <ButtonSmall type="button" onClick={() => {}}>
                나가기
              </ButtonSmall>
              <ButtonSmall type="button" onClick={() => {}}>
                취소
              </ButtonSmall>
            </div>
          </>
        </Modal>
        {/* <NameCardDefault label="닉네임 : ">닉</NameCardDefault>
      <ButtonFluid>칠드론</ButtonFluid>
      <Node />
      <NameCardSmall>스몰</NameCardSmall>
      <NameCardPlayerInfo color={COLOR.BLUE}>타이니</NameCardPlayerInfo>
      <NameCardPlayerInfo color={COLOR.GREEN}>타이니</NameCardPlayerInfo> */}
      </div>
    </Styled>
  );
}

export default sample;
