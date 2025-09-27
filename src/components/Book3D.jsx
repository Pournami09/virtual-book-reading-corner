import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tooltip, 
  Fade,
  useTheme
} from '@mui/material';

const Book3D = ({ book, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const bookColors = [
    '#6750A4', // Material 3 Purple
    '#7D5260', // Material 3 Pink
    '#006A6B', // Material 3 Teal
    '#006874', // Material 3 Cyan
    '#BA1A1A'  // Material 3 Red
  ];

  const color = bookColors[index % bookColors.length];
  const title = book.title || 'Unknown Title';
  const author = book.authors?.[0] || 'Unknown Author';
  const fullTitle = `${title} by ${author}`;
  
  // Truncate title to fit on spine (max 20 characters)
  const truncatedTitle = title.length > 20 ? title.substring(0, 17) + '...' : title;

  return (
    <Tooltip 
      title={fullTitle}
      placement="top"
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
    >
      <Box
        sx={{
          position: 'relative',
          cursor: 'pointer',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            zIndex: 10
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Select ${fullTitle} for reading`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* 3D Book Container */}
        <Box
          sx={{
            position: 'relative',
            width: 48,
            height: 240,
            transformStyle: 'preserve-3d',
            transform: isHovered ? 'rotateY(-15deg) rotateX(5deg)' : 'rotateY(0deg) rotateX(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Book Top */}
          <Box
            sx={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              height: 16,
              background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
              borderRadius: '4px 4px 0 0',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              transform: 'translateZ(2px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                borderRadius: '4px 4px 0 0'
              }
            }}
          />
          
          {/* Book Spine */}
          <Box
            sx={{
              position: 'relative',
              width: 48,
              height: 240,
              background: `linear-gradient(180deg, ${color} 0%, ${color}DD 100%)`,
              borderRadius: '0 0 0 8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
              transform: 'translateZ(0px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, transparent 100%)',
                borderRadius: '0 0 0 8px'
              }
            }}
          >
            {/* Book title - rotated vertically */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%) rotate(90deg)',
                transformOrigin: 'top center',
                width: 200,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  opacity: 0.9,
                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {truncatedTitle}
              </Typography>
            </Box>
          </Box>

          {/* Book Front Cover - Only visible on hover */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 48,
              height: 240,
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              borderRadius: '8px 0 0 8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
              transform: 'rotateY(90deg) translateZ(0px)',
              transformOrigin: 'left center',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
            }}
          >
            {/* Book Cover Content */}
            <Box sx={{ textAlign: 'center', transform: 'rotate(90deg)' }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
                  display: 'block',
                  mb: 0.5
                }}
              >
                {truncatedTitle}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  lineHeight: 1.2,
                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {author.length > 15 ? author.substring(0, 12) + '...' : author}
              </Typography>
            </Box>
          </Box>

          {/* Book Right Edge */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: -2,
              width: 4,
              height: 240,
              background: `linear-gradient(90deg, ${color}AA 0%, ${color}66 100%)`,
              transform: 'rotateY(90deg) translateZ(0px)',
              transformOrigin: 'left center',
              opacity: isHovered ? 0.8 : 0.3,
              transition: 'opacity 0.3s ease'
            }}
          />

          {/* Hover effect overlay */}
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0 0 0 8px',
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }}
            />
          )}
        </Box>

        {/* Book bottom shadow */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '100%',
            height: 4,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%)',
            borderRadius: '0 0 4px 4px',
            transform: isHovered ? 'scaleX(1.1)' : 'scaleX(1)',
            transition: 'transform 0.3s ease'
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default Book3D;
