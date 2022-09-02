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
    sendMessage
} from "../../helpers/helpers";

describe('rooms', () => { 
    before(()=> {
        const userName = 'Ruslan'
       loginUser(userName);
       checkIfRightUser(userName);
       openRoomTab();
    })
  
    it('Create Open Room', () => {
      createOpenRoom();
    })

    it('Invite to the Open Room', () => {
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
        checkIfChatOpen();
        sendMessage('Hello');
    }) 

    it('Edit messages to the rooms', () => {
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
        selectMessages();
        checkIfSelected();
        //click messages for unselect
        cy.get('.t-room-mine-message').click({ multiple: true, force: true });
        //check if unselected
        cy.get('.t-room-input').should('be.visible');
    })

    it('Delete selected to the Rooms', () => {
        selectMessages();
        clickDeleteSelectedMessagesButton();
        //cancel deletion
        cy.get('.t-cancel-delete-msg-popup-btn').click();
        cy.get('.t-modal').should('not.be.visible');  
        clickDeleteSelectedMessagesButton();
        //deletes selected messages
        cy.get('.t-delete-message-popup-btn').click();
        //check if selected messages deleted
        cy.get('.t-room-mine-message').should('not.be.visible');
    })
  })