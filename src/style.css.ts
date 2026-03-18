import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  padding: '16px 20px',
  flexDirection: 'column',
  gap: '2rem',
});

const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const articleCard = style({
  backgroundColor: '#F2F3F5',
  borderRadius: '24px',
  padding: '16px 0 16px 16px',
  overflow: 'hidden',
  cursor: 'pointer',
});

const articleContent = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  marginRight: '88px',
});

const articleTitle = style({
  fontWeight: 600,
});

const newBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

const newText = style({
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '1.25px',
  textTransform: 'uppercase',
  color: '#2A77EF',
});

const tagsRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const articleImgWrap = style({
  position: 'absolute',
  right: 0,
  top: 0,
  height: '80px',
  width: '88px',
  overflow: 'hidden',
  pointerEvents: 'none',
});

const articleImg = style({
  objectFit: 'contain',
  margin: '-16px 0',
});

export const appSt = {
  container,
  section,
  sectionHeader,
  articleCard,
  articleContent,
  articleTitle,
  newBadge,
  newText,
  articleImgWrap,
  articleImg,
  tagsRow,
};
