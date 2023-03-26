import { Component } from 'react';
import styled from 'styled-components';

export class GalleryItem extends Component {
  state = {};
  render() {
    return (
      <GalleryList>
        {this.props.articles.map(galleryItem => (
          <ListItemStyled key={galleryItem.id}>
            {' '}
            <ImageStyled
              src={galleryItem.previewURL}
              alt={galleryItem.tags}
              onClick={e => this.props.fullViewHandle(e, galleryItem.id)}
            />
          </ListItemStyled>
        ))}
      </GalleryList>
    );
  }
}

const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0;
`;
const ListItemStyled = styled.li`
  width: calc((100% - 45px) / 4);
`;
const ImageStyled = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
