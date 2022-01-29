The node express app is used to help learn about JWT.

Prereqs:

<ul>
<li>Create Private and Public Key follow</li>
<li>Replace the server.key</li>
<li>Create Connected App with Digital Signature</li>
    <ul>
        <li>Add the server.crt file</li>
    </ul>
<li>Change the authorization to Admin approved and add profiles</li>
<li>Add Client Id to the config file</li>
Requires node, to start use:<br>
<code>
node server.js
</code>
Post to localhost:5000/api/jwtauth with JSON body 'sub': &lt;username&gt;
Return will have the bearer access token to use for other api calls in the header