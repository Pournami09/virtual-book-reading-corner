import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tooltip, 
  Fade,
  useTheme
} from '@mui/material';

const Book3DAdvanced = ({ book, index, onClick, isHovered, onHover, onLeave }) => {
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
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateX(0px)' : 'translateX(0px)',
          zIndex: isHovered ? 20 : 1,
          '&:hover': {
            transform: 'translateY(-12px)',
            zIndex: 20
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2
          }
        }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onLeave()}
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
            transform: isHovered 
              ? 'rotateY(-90deg) rotateX(5deg) rotateZ(-2deg)' 
              : 'rotateY(0deg) rotateX(0deg) rotateZ(0deg)',
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

          {/* Book Front Cover - Enhanced for 90-degree view */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 48,
              height: 240,
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 50%, ${color}AA 100%)`,
              borderRadius: '8px 0 0 8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
              transform: 'rotateY(90deg) translateZ(0px)',
              transformOrigin: 'left center',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: `
                  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
                `,
                borderRadius: '8px 0 0 8px'
              }
            }}
          >
            {/* Book Cover Content - Optimized for 90-degree view */}
            <Box sx={{ 
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  lineHeight: 1.2,
                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
                  display: 'block',
                  mb: 1
                }}
              >
                {title.length > 15 ? title.substring(0, 12) + '...' : title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 400,
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
                  display: 'block',
                  mb: 1
                }}
              >
                {author.length > 15 ? author.substring(0, 12) + '...' : author}
              </Typography>
              {/* Book details for 90-degree view */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 0.5
              }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.6rem',
                    textAlign: 'center'
                  }}
                >
                  📖 Click to read
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Book Right Edge - Enhanced */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: -2,
              width: 4,
              height: 240,
              background: `linear-gradient(90deg, ${color}AA 0%, ${color}66 50%, ${color}33 100%)`,
              transform: 'rotateY(90deg) translateZ(0px)',
              transformOrigin: 'left center',
              opacity: isHovered ? 0.8 : 0.3,
              transition: 'opacity 0.4s ease',
              borderRadius: '0 2px 2px 0'
            }}
          />

          {/* Book Left Edge */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: -2,
              width: 4,
              height: 240,
              background: `linear-gradient(90deg, ${color}33 0%, ${color}66 50%, ${color}AA 100%)`,
              transform: 'rotateY(-90deg) translateZ(0px)',
              transformOrigin: 'right center',
              opacity: isHovered ? 0.6 : 0.2,
              transition: 'opacity 0.4s ease',
              borderRadius: '2px 0 0 2px'
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
                pointerEvents: 'none',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  borderRadius: '0 0 0 8px'
                }
              }}
            />
          )}
        </Box>

        {/* Enhanced bottom shadow */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -6,
            left: -2,
            right: -2,
            height: 6,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)',
            borderRadius: '0 0 6px 6px',
            transform: isHovered ? 'scaleX(1.2) scaleY(1.1)' : 'scaleX(1) scaleY(1)',
            transition: 'transform 0.4s ease',
            filter: 'blur(1px)'
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default Book3DAdvanced;
