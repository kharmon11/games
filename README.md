# games
A flask app for a collection of games
nodeJS v6.10.1
python 2.7.13
<h1>Setup</h1>
<hr>
<ul>
<li>Clone repository.</li>
<li>Install the Google Cloud SDK. Instructions can be found <a href="https://cloud.google.com/sdk/docs/">here</a></li>
<li>Install python dependencies: <code>pip install -t lib -r requirements.txt</code></li>
<li>Install nodeJS from <a href="https://nodejs.org/en/download/">here</a> (if you do not have it already)</l1>
<li>Install Webpack globally: <code>npm install -g webpack</code></li>
<li>Install npm dependencies: <code>npm install</code></li>
<li>Test on a local dveelopment server using dev_appserver.py in the root directory: <code>dev_appserver.py .</code> </li>
</ul>

<h1>Adding a Game</h1>
<hr>
<p>Add HTML file to <code>templates</code> directory. Add CSS file to <code>static/css</code>.</p>
<p>For your javascript files, you have two options:</p>
<ul>
<li>Add a javascript file directly into <code>static/js</code>, if you plan to only use vanilla javascript with no node modules.</li>
<li>
If you wish to take advantage of node modules, such as using ES6 compilers, you will need to javascript bundlers:
<li>Store your code in its own directory in <code>src</code></li>
<li>The convention for this project is name the entry point file 'index.js'</li>
<li>
Modify webpack.config.js to include your files for bundling. 
<p><pre><code>
entry: {
        tictactoe: './src/tictactoe/index.js',
        blackjack: './src/blackjack/index.js',
        yourgame: './src/yourgame/index.js
    }
</code></pre></p>
</li>
<li>In the root irectory, use <code>npm run build</code> to create a new bundle. The bundled javascript should appear in <code>src/js/yourgame.js</code></li>
</li>
</ul>
