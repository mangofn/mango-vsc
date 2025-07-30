import * as vscode from 'vscode';

// Hover provider for MangoUI
class MangoHoverProvider implements vscode.HoverProvider {
	private hoverData: { [key: string]: string } = {
		// UI Elements
		'window': 'Creates a window container element. Prefixes: title, width, height, icon path. Syntax: window "title" width height "icon.png" { ... }',
		'row': 'Creates a horizontal layout container that arranges child elements in a row. Properties: margin, bgcolor, wrap, width, height, border',
		'column': 'Creates a vertical layout container that arranges child elements in a column. Properties: margin, bgcolor, wrap, width, height, border',
		'button': 'Creates a clickable button element. Prefixes: text content. Properties: color, bgcolor, fontsize, margin, width, height, id',
		'text': 'Creates a text display element. Prefixes: text content. Properties: color, fontsize, fontweight, textalign, margin, id',
		'textbox': 'Creates an input field for text entry. Prefixes: placeholder text. Properties: width, height, fontsize, margin, id',
		'checkbox': 'Creates a checkbox input element. Prefixes: label text. Properties: margin, id',
		'radiobutton': 'Creates a radio button for single selection from a group. Prefixes: label text. Properties: margin, id',
		'toggleswitch': 'Creates a toggle switch for boolean values. Prefixes: label text. Properties: margin, id',
		'calendar': 'Creates a calendar/date picker element. Properties: width, height, margin, id',
		'togglebutton': 'Creates a button that can be toggled on/off. Properties: margin, id',
		'border': 'Creates a border container around child elements. Properties: corner, margin, id',

		// Properties - Dimensions
		'width': 'Sets the width of an element. Values: numeric (pixels), "hug" (fit content), "fill" (expand to parent)',
		'height': 'Sets the height of an element. Values: numeric (pixels), "hug" (fit content), "fill" (expand to parent)',
		'margin': 'Sets the margin/spacing around an element. Values: single number, or comma-separated (horizontal, vertical)',
		'corner': 'Sets the corner radius for borders. Values: single number or comma-separated values',
		'gap': 'Sets the spacing between child elements in a container. Value: numeric (pixels)',

		// Properties - Layout
		'align': 'Sets the alignment of child elements. Values: center, left, right, start, end',
		'justify': 'Sets the justification of child elements. Values: center, start, end, space-between, space-around',

		// Properties - Text
		'color': 'Sets the text color. Values: named colors (red, blue, green, yellow, pink, black, white) or hex (#RGB, #RRGGBB)',
		'bgcolor': 'Sets the background color. Values: named colors or hex values',
		'fontfamily': 'Sets the font family for text. Value: font name as string',
		'fontsize': 'Sets the font size. Value: numeric (pixels)',
		'fontweight': 'Sets the font weight. Values: bold, normal, or numeric values (100-900)',
		'fontstyle': 'Sets the font style. Values: italic, underline, strikethrough (can be combined)',
		'lineheight': 'Sets the line height for text. Value: numeric',
		'textalign': 'Sets text alignment. Values: left, center, right',
		'texttrim': 'Sets text trimming behavior. Values: word, character, notrim',
		'label': 'Sets or updates the text content of an element. Value: string',

		// Event Handlers
		'onclick': 'Defines what happens when the element is clicked. Syntax: onclick -> functionName or onclick -> { ... }',
		'onhover': 'Defines what happens when the element is hovered. Syntax: onhover -> functionName or onhover -> { ... }',
		'onchange': 'Defines what happens when the element value changes. Syntax: onchange -> functionName or onchange -> { ... }',

		// Properties - Boolean and Layout
		'wrap': 'Boolean property to enable/disable wrapping of child elements. Values: true, false',
		'hidden': 'Boolean property to show/hide element. Values: true, false',
		'id': 'Sets a unique identifier for the element. Value: string identifier',

		// Keywords
		'let': 'Declares a variable in Mango. Syntax: let variableName = value',
		'function': 'Declares a function in Mango. Syntax: function functionName() { ... }',
		'set': 'Sets a property value on an element. Syntax: set(property, element, value)',
		'update': 'Updates an element with new properties. Syntax: update(element) property value or update(element) { property: value }',
		'increment': 'Example function name - function names appear in yellow when defined',

		// Size Values
		'hug': 'Size value that makes the element fit its content size',
		'fill': 'Size value that makes the element expand to fill available space',
		'center': 'Alignment/justification value that centers elements',

		// Boolean Values
		'true': 'Boolean value representing true',
		'false': 'Boolean value representing false',
		
		// Font Style Values
		'italic': 'Font style value for italic text',
		'underline': 'Font style value for underlined text',
		'strikethrough': 'Font style value for strikethrough text',
		
		// Text Alignment Values
		'left': 'Text alignment value for left-aligned text',
		'right': 'Text alignment value for right-aligned text',
		
		// Text Trim Values
		'word': 'Text trim value to trim by word boundaries',
		'character': 'Text trim value to trim by character',
		'notrim': 'Text trim value to disable trimming',

		// Color Values
		'red': 'Named color value for red',
		'blue': 'Named color value for blue',
		'green': 'Named color value for green',
		'yellow': 'Named color value for yellow',
		'pink': 'Named color value for pink',
		'black': 'Named color value for black',
		'white': 'Named color value for white'
	};

	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
		const range = document.getWordRangeAtPosition(position);
		if (!range) {
			return null;
		}

		const word = document.getText(range);
		const hoverText = this.hoverData[word];

		if (hoverText) {
			const markdown = new vscode.MarkdownString();
			markdown.appendCodeblock(word, 'mango');
			markdown.appendMarkdown(`\n${hoverText}`);
			
			// Add examples for certain elements
			if (['button', 'text', 'window', 'border', 'row', 'column', 'onclick', 'update', 'set'].includes(word)) {
				markdown.appendMarkdown(`\n\n**Example:**`);
				switch (word) {
					case 'button':
						markdown.appendCodeblock('button "Click me" {\n  color: blue\n  bgcolor: white\n  fontsize: 14\n  id: myButton\n  onclick -> handleClick\n}', 'mango');
						break;
					case 'text':
						markdown.appendCodeblock('text "Hello World" {\n  color: black\n  fontsize: 16\n  textalign: center\n  id: myText\n}', 'mango');
						break;
					case 'window':
						markdown.appendCodeblock('window "My App" 800 600 "icon.png" {\n  // Your UI elements here\n}', 'mango');
						break;
					case 'border':
						markdown.appendCodeblock('border {\n  corner: 10\n  margin: 5\n  \n  text "Bordered content"\n}', 'mango');
						break;
					case 'row':
						markdown.appendCodeblock('row {\n  margin: 10\n  gap: 5\n  align: center\n  wrap: true\n  \n  button "Button 1"\n  button "Button 2"\n}', 'mango');
						break;
					case 'column':
						markdown.appendCodeblock('column {\n  margin: 10\n  gap: 10\n  justify: center\n  height: fill\n  \n  text "Item 1"\n  text "Item 2"\n}', 'mango');
						break;
					case 'onclick':
						markdown.appendCodeblock('button "Click me" {\n  onclick -> myFunction\n  // or inline:\n  onclick -> {\n    update(myText) label "Clicked!"\n  }\n}', 'mango');
						break;
					case 'update':
						markdown.appendCodeblock('// Single property:\nupdate(myText) label "New text"\n\n// Multiple properties:\nupdate(myText) {\n  label: "New text"\n  color: red\n  fontsize: 18\n}', 'mango');
						break;
					case 'set':
						markdown.appendCodeblock('set(label, myText, "New text")', 'mango');
						break;
				}
			}

			return new vscode.Hover(markdown, range);
		}

		return null;
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mango" is now active!');

	// Register the hover provider for Mango language
	const hoverProvider = vscode.languages.registerHoverProvider('mango', new MangoHoverProvider());
	context.subscriptions.push(hoverProvider);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('mango.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Mango!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
