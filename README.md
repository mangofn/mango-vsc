# Mango UI DSL Extension

A Visual Studio Code extension that provides syntax highlighting and language support for the Mango UI DSL (Domain Specific Language).

## Features

- **Syntax Highlighting**: Full syntax highlighting for Mango UI files (`.mango`)
- **Auto-indentation**: Smart indentation for block structures
- **Bracket Matching**: Automatic bracket pairing and matching
- **Word Selection**: Intelligent word boundary detection
- **Color Recognition**: Syntax highlighting for hex colors and named colors

## Example

```mango
window "My App" 600 400 "icon.png" {
    text "Welcome to Mango UI!" {
        fontsize: 40
        color: #ff00ff
        textalign: center
    }
    
    row {
        margin: 20
        
        button "Click me" {
            bgcolor: red
            width: 200
        }
        
        checkbox "Enable feature" {
            margin: 10, 0
        }
    }
}
```

## Requirements

- Visual Studio Code 1.102.0 or higher

## Release Notes

### 0.0.1
- Initial release with basic syntax highlighting for Mango UI DSL
- Support for all core UI elements and properties
- Auto-indentation and bracket matching
- Color highlighting for hex and named colors

---

**Enjoy coding with Mango UI!** 🥭