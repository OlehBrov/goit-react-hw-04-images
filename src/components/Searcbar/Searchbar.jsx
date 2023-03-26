import { useState } from 'react';
import { Formik, Form } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { SearchbarStyled, FieldStyled, SearchButtonStyled } from './Searchbar.styled';
// import styled from 'styled-components';

export const Searchbar = (props) => {

  const [searchQuery, setSearchQuery] = useState('');

  const searchSubmit = values => {
    props.searchInputHandler(searchQuery);
    setSearchQuery('');
  };
 const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value.trim());
  };
  return (
      <SearchbarStyled>
        <Formik
          initialValues={searchQuery}
          onSubmit={searchSubmit}
        >
          <Form>
            <FieldStyled
              id="searchQuery"
              name="searchQuery"
              placeholder="Enter your query"
              value={searchQuery}
              onChange={handleChange}
            />
            <IconContext.Provider
              value={{
                size: '20px',
                attr: {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                },
              }}
            >
              <SearchButtonStyled type="submit">
                <AiOutlineSearch />
              </SearchButtonStyled>
            </IconContext.Provider>
          </Form>
        </Formik>
      </SearchbarStyled>
    );
}

// export class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   searchSubmit = values => {
//     this.props.searchInputHandler(this.state.searchQuery);
//     this.setState({ searchQuery: '' });
//   };
//   handleChange = e => {
//     const { value } = e.target;
//     this.setState({ searchQuery: value });
//   };
//   render() {
//     return (
//       <SearchbarStyled>
//         <Formik
//           initialValues={this.state.searchQuery}
//           onSubmit={this.searchSubmit}
//         >
//           <Form>
//             <FieldStyled
//               id="searchQuery"
//               name="searchQuery"
//               placeholder="Enter your query"
//               value={this.state.searchQuery}
//               onChange={this.handleChange}
//             />
//             <IconContext.Provider
//               value={{
//                 size: '20px',
//                 attr: {
//                   position: 'absolute',
//                   top: '0',
//                   left: '0',
//                 },
//               }}
//             >
//               <SearchButtonStyled type="submit">
//                 <AiOutlineSearch />
//               </SearchButtonStyled>
//             </IconContext.Provider>
//           </Form>
//         </Formik>
//       </SearchbarStyled>
//     );
//   }
// }


