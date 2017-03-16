function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();

    // Behaviours    
    self.goToFolder = function(folder) { 
        self.chosenFolderId(folder);
        self.chosenMailData(null); // Stop showing mail
        $.get('/mail', { folder: folder }, self.chosenFolderData);
    };
    self.goToMail = function(mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null); // Stop showing folder
        $.get("/mail", { mailId: mail.id }, self.chosenMailData);
    };
    // Show inbox by default
    self.goToFolder('Inbox');
};

ko.applyBindings(new WebmailViewModel());