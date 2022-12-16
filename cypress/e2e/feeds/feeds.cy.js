import {
    checkIfRightUser,
    clearDb,
    createOpenRoom,
    loginUser,
    openFeeds,
    openRoomTab
} from "../../helpers/helpers";


describe('Feeds', () => {
    before(()=> {
        clearDb();
        const userName = 'Ruslan'
        loginUser(userName);
        checkIfRightUser(userName);
        openRoomTab();
        createOpenRoom();
        for(let i = 0; i < 100; i++) {
            //logout user
            cy.get('.t-logout').click({force:true});
            cy.get('.t-logout-without-key').click();
            cy.get('.t-logout-without-key-modal').should('be.visible');
            cy.get('.t-logout-btn').click();
            //give the unique name to user
            loginUser(i + userName);
        }
    })

    it('Check feeds loading', () => {
        openFeeds()
        //check
        cy.get(".t-feed-list").children().should("have.length", 100);
        cy.get('.t-feedsBlock').scrollTo("bottom", {duration: 2000});
        cy.get(".t-load-more").click();
        cy.get('.t-feedsBlock').scrollTo("bottom", {duration: 2000});
        cy.get(".t-load-more").click();
        cy.get(".t-feed-list").children().should("have.length", 200);
        cy.get('.t-feedsBlock').scrollTo("bottom", {duration: 2000});
        cy.get(".t-load-more").should("not.be.visible");
    })
  })