(function() {
    // 1. Futuristic Styles Injection
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --selam-primary: #ffffff; /* White for the icon/accents */
            --selam-ash-dark: #1a1a1c; /* Deep Ash Gray */
            --selam-ash-border: #2d2d30; 
            --selam-glow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        #selam-launcher {
            width: 65px;
            height: 65px;
            border-radius: 22px; /* Smooth Squircle */
            background: var(--selam-ash-dark);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--selam-glow);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid var(--selam-ash-border);
            position: relative;
        }

        #selam-launcher:hover {
            transform: scale(1.05);
            background: #252528; /* Slightly lighter on hover */
            border-color: #444;
        }
        
        #selam-launcher::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--selam-primary);
            animation: selam-pulse 2s infinite;
        }

        @keyframes selam-pulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }

       #selam-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: 'Outfit', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            /* Added this to prevent the container from blocking the whole screen */
            pointer-events: none; 
        }

        /* Essential for mobile: make sure parts inside are clickable again */
        #selam-launcher, #selam-window {
            pointer-events: auto;
        }

        #selam-window {
            width: 380px;
            max-width: 90vw; /* Use 90% of the screen width on small devices */
            height: 550px;
            max-height: 70vh; /* Use 70% of the screen height on small devices */
            background: var(--selam-glass);
            backdrop-filter: blur(25px) saturate(180%);
            -webkit-backdrop-filter: blur(25px) saturate(180%);
            border: 1px solid var(--selam-border);
            border-radius: 24px;
            margin-bottom: 20px;
            display: none; 
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: selam-slideIn 0.5s ease-out;
        }

        /* --- MOBILE RESPONSIVENESS ADDITION --- */
        @media (max-width: 480px) {
            #selam-container {
                right: 10px;
                bottom: 10px;
                left: 10px; /* Center it slightly more on tiny screens */
            }
            #selam-window {
                width: calc(100vw - 20px);
                height: 60vh;
                bottom: 80px;
            }
            #selam-launcher {
                width: 55px;
                height: 55px;
            }
        }

        @keyframes selam-slideIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Fancy Header */
        .selam-header {
            padding: 20px;
            background: rgba(255, 255, 255, 0.03);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--selam-border);
        }

        .selam-title { font-weight: 700; letter-spacing: 1px; color: #fff; display: flex; align-items: center; gap: 8px;}
        .selam-online-dot { width: 8px; height: 8px; background: #00ff88; border-radius: 50%; box-shadow: 0 0 10px #00ff88; }

        .selam-close {
            background: none;
            border: none;
            color: var(--text-muted, #a0a0a0);
            font-size: 24px;
            cursor: pointer;
            transition: 0.3s;
        }
        .selam-close:hover { color: #ff4c4c; transform: rotate(90deg); }

        /* Messages Area */
        #selam-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
            scrollbar-width: thin;
        }

        .s-msg {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 0.95rem;
            line-height: 1.4;
            animation: selam-msgFade 0.3s ease-in;
        }

        @keyframes selam-msgFade { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }

        .u-msg { align-self: flex-end; background: #ffffff; color: #000000; border-bottom-right-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .b-msg { align-self: flex-start; background: #1a1a1c; color: #ffffff; border: 1px solid var(--selam-ash-border); border-bottom-left-radius: 4px; }

        /* Input Area */
        .selam-footer {
            padding: 20px;
            display: flex;
            gap: 12px;
            background: rgba(0,0,0,0.2);
        }

        #selam-input {
            flex: 1;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--selam-border);
            border-radius: 12px;
            padding: 12px;
            color: white;
            outline: none;
            transition: 0.3s;
        }

        #selam-input:focus { border-color: var(--selam-primary); background: rgba(255,255,255,0.08); }

        #selam-send {
            background: var(--selam-primary);
            border: none;
            border-radius: 12px;
            width: 45px;
            cursor: pointer;
            transition: 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #selam-send:hover { 
        background: #f0f0f0; 
        transform: translateY(-2px); 
        }; }
    `;
    document.head.appendChild(style);

    // 2. HTML Structure
    const container = document.createElement('div');
    container.id = 'selam-container';
    container.innerHTML = `
        <div id="selam-window">
            <div class="selam-header">
                <div class="selam-title">
                    <div class="selam-online-dot"></div>
                    Selam Assistant
                </div>
                <button class="selam-close" id="selam-close-btn">&times;</button>
            </div>
            <div id="selam-messages">
                <div class="s-msg b-msg">እኔ የ አሸናፊ ረዳት ነኝ፤ በምን ልርዳዎት እችላለው ?</div>
            </div>
            <div class="selam-footer">
                <input type="text" id="selam-input" placeholder="ይጻፉ..." autocomplete="off">
                <button id="selam-send">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
        <div id="selam-launcher">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 11c0-4.97 4.03-9 9-9s9 4.03 9 9"></path>
            <path d="M21 11v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2z"></path>
            <path d="M7 11v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2z"></path>
            <path d="M21 16v2a2 2 0 0 1-2 2h-5"></path>
            </svg>
        </div>
    `;
    document.body.appendChild(container);

    // 3. Logic & API Implementation
    const win = document.getElementById('selam-window');
    const launch = document.getElementById('selam-launcher');
    const close = document.getElementById('selam-close-btn');
    const input = document.getElementById('selam-input');
    const send = document.getElementById('selam-send');
    const msgs = document.getElementById('selam-messages');

    let autoCloseTimer = null;

    const toggle = (auto = false) => {
        // We check 'none' OR empty string because JS often sees the initial state as empty
        const isHidden = win.style.display === 'none' || win.style.display === '';
        
        if (isHidden) {
            win.style.display = 'flex';
            launch.style.display = 'none';
        } else {
            win.style.display = 'none';
            launch.style.display = 'flex';
        }

        if (!auto && autoCloseTimer) {
            clearTimeout(autoCloseTimer);
            autoCloseTimer = null;
        }
    };
    // --- Improved Auto-Peek Logic ---
    const startAutoPeek = () => {
        setTimeout(() => {
            // Only auto-open if the user hasn't already opened it manually
            if (win.style.display !== 'flex') {
                toggle(true); // Open automatically
                
                autoCloseTimer = setTimeout(() => {
                    if (win.style.display === 'flex') {
                        toggle(true); // Close automatically
                    }
                }, 3000); 
            }
        }, 4000); 
    };

    // This ensures the script runs even if the page finished loading 10ms ago
    if (document.readyState === 'complete') {
        startAutoPeek();
    } else {
        window.addEventListener('load', startAutoPeek);
    }
    launch.onclick = () => toggle();
    close.onclick = () => toggle();
    
    // --- Communication Functions ---
    async function handleSend() {
        const text = input.value.trim();
        if(!text) return;

        appendMsg('u-msg', text);
        input.value = '';

        const loadId = 'ld-' + Date.now();
        appendMsg('b-msg', '...', loadId);

        try {
            const res = await fetch('https://selam-backend-1biy.onrender.com/api/support', { 
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            const loader = document.getElementById(loadId);
            if(loader) loader.innerText = "System connection lost. Check your backend.";
            if(loader) {
                loader.style.color = "#ff4c4c"; // Red color for the error text
                loader.innerText = "System connection lost. Check your backend.";
            }
    }

   function appendMsg(type, text, id = '') {
    const div = document.createElement('div');
    div.className = `s-msg ${type}`;
    if(id) div.id = id;

    // 1. THE TRICK: Use Regex to find **text** and replace with <b>text</b>
    // This handles **bold**, ***bold-italic***, and even 5 asterisks!
    let formattedText = text
        .replace(/\*\*\*+(.*?)\*\*\*+/g, '<b>$1</b>') // Handles 3+ asterisks
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')      // Handles 2 asterisks
        .replace(/\*(.*?)\*/g, '<i>$1</i>');         // Handles 1 asterisk (italics)

    // 2. Change .innerText to .innerHTML so the browser renders the <b> tags
    div.innerHTML = formattedText;

    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;}
    send.onclick = handleSend;
    input.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };
})();
