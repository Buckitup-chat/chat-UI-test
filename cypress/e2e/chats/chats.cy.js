import {
    cancelDeletion,
    checkIfRightUser, checkIfSelected, clearDb, clickDeleteButton, clickDeleteSelectedMessagesButton,
    editMessage,
    loginUser,
    openMessageContextMenu, openMyNotes, openRoomTab,
    selectMessages,
    sendMessage
} from "../../helpers/helpers";

describe('chats', () => { 
    beforeEach(()=> {
        clearDb()
        const userName = 'Test User'
        loginUser(userName)
        checkIfRightUser(userName)
    })

    it('Send to My private notes', () => {
        sendMessage('Hi there', 'chat')
    })

    it('Edit My private notes', () => {
        sendMessage('Hi there', 'chat')
        const message = ' how are you?'
        openMessageContextMenu();
        editMessage(message, 'chat');
        //cancel editing
        cy.get('.t-cancel-edit').click();
        openMessageContextMenu();
        editMessage(message, 'chat');
        //sends message
        cy.get('.t-chat-edit-send-btn').click({force:true});
        //check if the right message
        cy.get('.t-chat-mine-message').contains('Hi there how are you?');
    })

    it('Delete My private notes', () => {
        sendMessage('Hi there', 'chat')
       openMessageContextMenu();
        clickDeleteButton();
        //cancel deleting
        cy.get('.t-delete-cancel').click();
        cy.get('.t-delete-message-popup').should('not.be.visible');
        openMessageContextMenu();
        clickDeleteButton();
        //deletes message
        cy.get('.t-delete-message-btn').click();
        //check if the message deleted
        cy.get('.t-chat-mine-message').should('not.be.visible');
    })

    it('Select messages in My private notes', () => {
        selectMessages('chat');
        checkIfSelected('chat');
        //click messages for unselect
        cy.get('.t-chat-mine-message').first().click();
        //check if unselected
        cy.get('.t-chat-input').should('be.visible');
    })

    it('Delete selected messages in My private notes', () => {
        selectMessages('chat');
        cy.get('.t-chat-mine-message').last().click();
        clickDeleteSelectedMessagesButton('chat');
        cancelDeletion();
        clickDeleteSelectedMessagesButton('chat');
        //deletes selected messages
        cy.get('.t-delete-message-popup-btn').click();
        //check if selected messages deleted
        cy.get('.t-chat-mine-message').should('not.be.visible');
    })

    it('Check if proper message rendering', () => {
        const messagesCount = 20;
        for(let i = 1; i < 21; i++) {
            sendMessage(`${i}`, 'chat')
        }
        openRoomTab()
        cy.get('.t-chats').click();
        for (let i = 0; i < 2; i++) {
            cy.get('.t-my-notes').first().click();
        }
        //Count elements
         cy.window().then((win) => {
           let children = win.eval('let messages = document.getElementById(\'chat-messages\');' +
                'children = messages.children');
             cy.get(children).should("have.length", messagesCount)
        });
        //deletes message
        cy.get('.t-message-dropdown').eq(3).click();
        cy.get('.t-delete-message').eq(3).click();
        cy.get('.t-delete-message-btn').click({force: true});

        //deletes message
        cy.get('.t-message-dropdown').eq(7).click();
        cy.get('.t-delete-message').eq(7).click({force: true});
        cy.get('.t-delete-message-btn').click();

        //scroll up
        cy.get('.t-chat-content').scrollTo('top', {duration: 2000});
        //scroll down
        cy.get('.t-chat-content').scrollTo('center', {duration: 2000} );
        //scroll up
        cy.get('.t-chat-content').scrollTo('top', {duration: 2000});
        //check amount of elements after deleting
        cy.window().then((win) => {
            let children = win.eval('let messages = document.getElementById(\'chat-messages\');' +
                'children = messages.children');
            //filter visible elements
            let visibleElements = Array.from(children).filter(el => !el.className.includes('hidden'))
            cy.get(visibleElements).should('have.length',messagesCount - 2)
        });
     })
});