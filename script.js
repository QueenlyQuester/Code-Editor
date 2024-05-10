// Define editors in a scope accessible throughout the script
var htmlEditor, cssEditor, jsEditor;
var availableThemes = ['blackboard', 'dracula', 'default']; // Add more themes as needed
var currentThemeIndex = 0;

function run() {
    try {
        let htmlCode = htmlEditor.getValue();
        let cssCode = cssEditor.getValue();
        let jsCode = jsEditor.getValue();
        let outputFrame = document.getElementById("output");

        if (!outputFrame) {
            throw new Error("Output frame not found");
        }

        // Clear previous styles and scripts
        outputFrame.contentDocument.head.innerHTML = '';
        outputFrame.contentDocument.body.innerHTML = '';

        // Update HTML content
        outputFrame.contentDocument.body.innerHTML = htmlCode;

        // Inject CSS styles
        let style = outputFrame.contentDocument.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(cssCode));
        outputFrame.contentDocument.head.appendChild(style);

        // Inject JavaScript code
        let script = outputFrame.contentDocument.createElement('script');
        script.type = 'text/javascript';
        script.appendChild(document.createTextNode(jsCode));
        outputFrame.contentDocument.body.appendChild(script);
    } catch (error) {
        console.error('Error running code: ', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize CodeMirror Instances
        htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
            mode: 'htmlmixed',
            theme: availableThemes[currentThemeIndex],
            lineNumbers: true,
            lineWrapping: true,
        });

        cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
            mode: 'css',
            theme: availableThemes[currentThemeIndex],
            lineNumbers: true,
            lineWrapping: true,
        });

        jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
            mode: 'javascript',
            theme: availableThemes[currentThemeIndex],
            lineNumbers: true,
            lineWrapping: true,
        });

        // Theme Switch button
        var themeSwitcher = document.getElementById('theme-switcher');
        themeSwitcher.addEventListener('click', function() {
            currentThemeIndex = (currentThemeIndex + 1) % availableThemes.length;
            var newTheme = availableThemes[currentThemeIndex];

            htmlEditor.setOption('theme', newTheme);
            cssEditor.setOption('theme', newTheme);
            jsEditor.setOption('theme', newTheme);
        });

        // Binding the Function to the change event on each code mirror
        htmlEditor.on("change", run);
        cssEditor.on("change", run);
        jsEditor.on("change", run);

        // Initial run to populate the output
        run();

        // Fullscreen Toggle button
        var fullscreenToggle = document.getElementById('fullscreen-toggle');
        fullscreenToggle.addEventListener('click', function() {
            var container = document.querySelector('.container');
            if (!document.fullscreenElement) {
                container.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    } catch (error) {
        console.error('Error initializing CodeMirror: ', error);
    }
});