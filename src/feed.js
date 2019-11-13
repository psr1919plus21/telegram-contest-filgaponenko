import Api from './services/Api';

renderContacts();

function renderContacts() {
    const contactsContainer = document.querySelector('.contacts-list');

    Api.getContacts()
        .then((result) => {
            const contacts = result && result.data;
            
            if (!contacts || !contacts.length) {
                return;
            }

            let fragment = document.createDocumentFragment();
            contacts.forEach((item) => {
                // Item
                const contactsItem = document.createElement('li');
                contactsItem.classList.add('contacts-list__item');

                // Photo
                const contactsItemPhoto = document.createElement('img');
                contactsItemPhoto.classList.add('contacts-list__photo');
                // TODO: get photo for user here
                contactsItemPhoto.setAttribute('src', 'https://img.buzzfeed.com/buzzfeed-static/static/2014-11/19/17/enhanced/webdr08/longform-original-24472-1416436233-3.jpg');

                // Info
                const contactsItemInfo = document.createElement('div');
                contactsItemInfo.classList.add('contacts-list__info');

                // Name
                const contactsItemName = document.createElement('div');
                contactsItemName.classList.add('contacts-list__name');
                contactsItemName.textContent = `${item.first_name} ${item.last_name}`.trim();

                // Status
                const contactsItemStatus = document.createElement('div');
                contactsItemStatus.classList.add('contacts-list__status');
                contactsItemStatus.textContent = Math.floor((Math.random() * 2)) ? 'Online' : 'Offline';

                contactsItem.appendChild(contactsItemPhoto);
                contactsItemInfo.appendChild(contactsItemName);
                contactsItemInfo.appendChild(contactsItemStatus);
                contactsItem.appendChild(contactsItemInfo);
                fragment.appendChild(contactsItem);
            });
            
            contactsContainer.appendChild(fragment);
        });
}