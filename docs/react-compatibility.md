# React Compatibility Guide

## Supported Versions

This package supports **React 18+** and **React 19**, providing compatibility with both the current stable version and the latest release.

### React 18 Support

- ✅ Full compatibility with React 18.x
- ✅ Uses the new `createRoot` API
- ✅ Supports React 18 concurrent features
- ✅ Compatible with React 18 StrictMode

### React 19 Support

- ✅ Forward compatibility with React 19.x
- ✅ Uses latest React APIs
- ✅ Tested with React 19 features

## Installation

The package automatically works with both React versions:

```bash
# With React 18
npm install react-body-highlighter react@^18.0.0 react-dom@^18.0.0

# With React 19
npm install react-body-highlighter react@^19.0.0 react-dom@^19.0.0
```

## Breaking Changes from Previous Versions

- **Minimum React version**: Now requires React 18+ (previously supported React 16+)
- **Peer Dependencies**: Updated to `react: ">=18"`

## Migration from React 16/17

If you're upgrading from React 16 or 17, you'll need to:

1. Update React to version 18 or 19
2. Update your app to use `createRoot` instead of `ReactDOM.render`
3. Ensure TypeScript types are compatible

### Example Migration

**Before (React 17):**
```tsx
import ReactDOM from 'react-dom';
import Model from 'react-body-highlighter';

ReactDOM.render(<Model data={data} />, document.getElementById('root'));
```

**After (React 18+):**
```tsx
import { createRoot } from 'react-dom/client';
import Model from 'react-body-highlighter';

const root = createRoot(document.getElementById('root')!);
root.render(<Model data={data} />);
```

## Testing

The library is automatically tested against both React 18 and React 19 in our CI pipeline to ensure compatibility.

## Troubleshooting

### Type Errors

If you encounter TypeScript errors, ensure you have the correct types installed:

```bash
# For React 18
npm install --save-dev @types/react@^18.0.0 @types/react-dom@^18.0.0

# For React 19
npm install --save-dev @types/react@^19.0.0 @types/react-dom@^19.0.0
```

### Peer Dependency Warnings

If you see peer dependency warnings, ensure your React version meets the minimum requirement:

```json
{
  "peerDependencies": {
    "react": ">=18"
  }
}
```
