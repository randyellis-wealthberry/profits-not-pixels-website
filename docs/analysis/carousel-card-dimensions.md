# Apple Carousel Card Dimensions

This document provides the exact dimensions and specifications for creating custom assets for the Apple-style carousel cards in the Profits Not Pixels website.

## Card Dimensions

### Mobile (< 768px)
- **Width**: `w-56` = **224px**
- **Height**: `h-80` = **320px**
- **Aspect Ratio**: 1:1.43

### Desktop (≥ 768px)
- **Width**: `md:w-96` = **384px** 
- **Height**: `md:h-[40rem]` = **640px**
- **Aspect Ratio**: 1:1.67

## Card Styling Specifications

### Visual Design
- **Border Radius**: `rounded-3xl` = **24px**
- **Background**: 
  - Light mode: `bg-gray-100`
  - Dark mode: `bg-neutral-900`

### Image Specifications
- **Positioning**: Image fills the entire card (`absolute inset-0`)
- **Object Fit**: `object-cover` (fills container while maintaining aspect ratio)
- **Overlay Gradient**: `from-black/50 via-transparent to-transparent`

### Content Area
- **Text Overlay Padding**: `p-8` = **32px** on all sides
- **Category Text Size**: 
  - Mobile: `text-sm` (14px)
  - Desktop: `text-base` (16px)
- **Title Text Size**:
  - Mobile: `text-xl` (20px)
  - Desktop: `text-3xl` (30px)

## Recommended Asset Sizes

For optimal display quality across all devices:

### Standard Resolution
- **Mobile**: 224 × 320px
- **Desktop**: 384 × 640px

### High Resolution (Recommended)
- **Mobile**: 448 × 640px (2x)
- **Desktop**: 768 × 1280px (2x)

### Ultra High Resolution
- **Mobile**: 672 × 960px (3x)
- **Desktop**: 1152 × 1920px (3x)

## Asset Creation Guidelines

1. **Aspect Ratio**: Maintain the specified aspect ratios to prevent distortion
2. **Content Safety**: Keep important text/visual elements away from the top-left corner where overlay text appears
3. **Contrast**: Ensure sufficient contrast with white text overlay in the top-left area
4. **File Format**: Use optimized formats (WebP, JPEG) for web delivery
5. **File Size**: Optimize images for web to maintain performance

## Implementation Notes

- Cards use responsive design with different dimensions on mobile vs desktop
- Images automatically scale and crop using `object-cover`
- Text overlay appears in the top-left with a gradient background for readability
- Cards have a 3D transform effect on hover/interaction

## File Location

The carousel component can be found at:
- Component: `src/components/ui/apple-cards-carousel.tsx`
- Demo: `src/components/apple-cards-carousel-demo.tsx`