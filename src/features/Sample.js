import React from "react";

import ButtonDefault from "../common/components/buttons/ButtonDefault";
import Input from "../common/components/inputs/Input";
import NameCardDefault from "../common/components/namsCard/NameCardDefault";
// import Modal from "../common/components/modal/Modal";
import Title from "../common/components/title/Title";

function sample() {
  return (
    <div>
      <Title />
      <br />
      <ButtonDefault contents="여기에 내용" />
      <Input label="여기에 라벨" inputTitle="여기에 인풋 타이틀" />
      {/* <Modal>{"모달 칠드런"}</Modal> */}
      <NameCardDefault contents="닉" />
    </div>
  );
}

export default sample;
