import {
    checkIfChatOpen,
    checkIfRightUser,
    checkIfSelected,
    checkInvitationSent,
    clickDeleteButton,
    clickDeleteSelectedMessagesButton,
    closePopups,
    createOpenRoom,
    createPrivateRoom,
    createSecretRoom,
    editMessage,
    loginUser,
    openInviteWindow,
    openMessageContextMenu,
    openRoomTab,
    sendInvitation,
    selectMessages,
    sendMessage, cancelDeletion, openMyNotes, clearDb
} from "../../helpers/helpers";

describe('rooms', () => { 
    beforeEach(()=> {
        const userName = 'Ruslan'
       loginUser(userName);
       checkIfRightUser(userName);
       openRoomTab();
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // allow the test to continue
        return false
    })
  
    it('Create Open Room', () => {
      createOpenRoom();
    })

    it('Invite to the Open Room', () => {
        createOpenRoom();
        openInviteWindow();
        sendInvitation();
        checkInvitationSent();
        closePopups();
    })

    it('Invite to the Private Room', () => {
        createPrivateRoom();
        openInviteWindow();
        sendInvitation();
        checkInvitationSent();
        closePopups();
    })

    it('Invite to the Secret Room', () => {
        createSecretRoom();
        openInviteWindow();
        sendInvitation();
        checkInvitationSent();
        closePopups();
    })

    it('Send messages to the rooms', () => {
        createOpenRoom();
        checkIfChatOpen();
        sendMessage('Hello');
    })

    it('Edit messages to the rooms', () => {
        createOpenRoom();
        sendMessage('Hello');
        const message = ' how are you?';
        checkIfChatOpen();
        openMessageContextMenu();
        editMessage(message);
        //cancel editing
        cy.get('.t-cancel-edit').click();
        openMessageContextMenu();
        editMessage(message);
        //sends message
        cy.get('.t-room-edit-send-btn').click({force:true});
        //check if the right message
        cy.get('.t-room-mine-message').contains('Hello how are you?');
    })

    it('Delete messages to the rooms', () => {
        createOpenRoom();
        sendMessage('Hello');
        checkIfChatOpen();
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
        cy.get('.t-room-mine-message').should('not.be.visible');
    })

    it('Select messages to the Rooms', () => {
        createOpenRoom()
        selectMessages();
        checkIfSelected();
        //click messages for unselect
        cy.get('.t-room-mine-message').first().click();
        //check if unselected
        cy.get('.t-room-input').should('be.visible');
    })

    it('Delete selected to the Rooms', () => {
        createOpenRoom()
        selectMessages();
        cy.get('.t-chat-mine-message').last().click();
        clickDeleteSelectedMessagesButton();
        cancelDeletion()
        clickDeleteSelectedMessagesButton();
        //deletes selected messages
        cy.get('.t-delete-message-popup-btn').click();
        //check if selected messages deleted
        cy.get('.t-room-mine-message').should('not.be.visible');
    })

    it('Check if proper message rendering', () => {
        clearDb()
        cy.visit(Cypress.env('url'));
        openRoomTab();
        createOpenRoom()
        //go to the room
        cy.get('.t-confirmed-rooms-list').eq(0).click();
        const messagesCount = 20;
        let children;
        for(let i = 1; i < 21; i++) {
            sendMessage(`${i}`, )
        }
        cy.get('.t-chats').click();
        for (let i = 0; i < 2; i++) {
            cy.get('.t-my-notes').first().click();
        }
        //open roomTab
        cy.get('.t-rooms').click();
        cy.get('.t-create-room').should('be.enabled');
        cy.get('.t-sidebar-create-room').should('be.enabled');
        cy.get('.t-unconfirmed-rooms').should('be.visible');
        //go to the room
        cy.get('.t-confirmed-rooms-list').eq(0).click().wait(2000);
        //Count elements before deleting
        cy.window().then((win) => {
            let children = win.eval('let messages = document.getElementById(\'chat-messages\');' +
                'el = messages.children');
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
            children = win.eval('let messages = document.getElementById(\'chat-messages\');' +
                'children = messages.children');
            //filter visible elements
            let childrenAfterDeleting = Array.from(children).filter(el => !el.className.includes('hidden'))
            cy.get(childrenAfterDeleting).should('have.length',messagesCount - 2)
        });
    })

    it('message received', () => {
        const message = 'Hello'
        sendMessage(message);
        //Check if User see sent message
        cy.get('#chat-messages').children().last().contains(message)
    })

    // it('Confirm Invite to the Open Room', () => {
    //     const userName = 'Ruslan'
    //     loginUser(userName);
    //     cy.window().then((win) => {
    //         let key = win.eval('localStorage.getItem(\'buckitUp-chat-auth\');')
    //         console.log(key)
    //     });
    // })
  })