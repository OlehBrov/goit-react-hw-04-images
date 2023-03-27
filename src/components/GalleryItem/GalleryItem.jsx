import styled from 'styled-components';

export const GalleryItem = ({articles, fullViewHandle}) => {
  return (
      <GalleryList>
        {articles.map(galleryItem => (
          <ListItemStyled key={galleryItem.id}>
            {' '}
            <ImageStyled
              src={galleryItem.previewURL}
              alt={galleryItem.tags}
              onClick={e => fullViewHandle(e, galleryItem.id)}
            />
          </ListItemStyled>
        ))}
      </GalleryList>
    );
}


const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0;
`;
const ListItemStyled = styled.li`
  width: calc((100% - 105px) / 8);
`;
const ImageStyled = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
