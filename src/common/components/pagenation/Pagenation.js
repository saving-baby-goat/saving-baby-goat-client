/* eslint-disable react/react-in-jsx-scope */
import PropTypes from "prop-types";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: ${COLOR.BROWN};
  color: white;
  font-size: 1rem;

  &:hover {
    background: ${COLOR.RED};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: ${COLOR.DARK_BROWN};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ${COLOR.DARK_BROWN};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={numPages}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
