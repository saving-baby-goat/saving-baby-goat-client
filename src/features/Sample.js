import React from "react";

import ButtonDefault from "../common/components/buttons/ButtonDefault";
import ButtonFluid from "../common/components/buttons/ButtonFluid";
import Input from "../common/components/inputs/Input";
import NameCardDefault from "../common/components/nameCard/NameCardDefault";
import NameCardPlayerInfo from "../common/components/nameCard/NameCardPlayerInfo";
import NameCardSmall from "../common/components/nameCard/NameCardSmall";
import Node from "../common/components/node/Node";
// import Modal from "../common/components/modal/Modal";
import Title from "../common/components/title/Title";
import { COLOR } from "../common/util/constants";

function sample() {
  return (
    <div>
      <Title />
      <br />
      <ButtonDefault>여기에 내용</ButtonDefault>
      <Input label="여기에 라벨" inputTitle="여기에 인풋 타이틀" />
      {/* <Modal>{"모달 칠드런"}</Modal> */}
      <NameCardDefault label="닉네임 : ">닉</NameCardDefault>
      <ButtonFluid>칠드론</ButtonFluid>
      <Node />
      <NameCardSmall>스몰</NameCardSmall>
      <NameCardPlayerInfo color={COLOR.BLUE}>타이니</NameCardPlayerInfo>
      <NameCardPlayerInfo color={COLOR.GREEN}>타이니</NameCardPlayerInfo>
    </div>
  );
}

export default sample;
