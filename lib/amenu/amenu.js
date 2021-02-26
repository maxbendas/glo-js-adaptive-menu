(() => {

    let burgerWidth = 0
    let lastWidthItem = 0

    const init = (menu, menuList, itemsMenu, burgerMenu) => {
        itemsMenu.forEach(elem => {
            elem.classList.add('amenu__item')
        })
        burgerMenu.classList.add('amenu__burger')

        const [burgerBtn, burgerList] = createBurgerMenu(burgerMenu)

        updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList)

    }

    const createBurgerMenu = (parentBurger) => {
        const burgerBtn = document.createElement('button')
        parentBurger.append(burgerBtn)
        burgerBtn.classList.add('amenu__burger-btn')

        burgerBtn.addEventListener('click', () => {
            parentBurger.classList.toggle('amenu__burger-open')
        })

        const burgerList = document.createElement('ul')
        parentBurger.append(burgerList)
        burgerList.classList.add('amenu__burger-list')

        return [burgerBtn, burgerList]
    }

    const updateMenu = (menu, menuList, burgerMenu, burgerBtn, burgerList) => {
        const menuItems = menuList.querySelectorAll('.amenu__item')
        const burgerItems = burgerList.querySelectorAll('.amenu__item')

        const widthMenu = menu.offsetWidth;

        burgerWidth = burgerMenu.offsetWidth || burgerWidth

        const widthAllItems = [...menuItems].reduce((acc, elem) => {
            return acc + elem.offsetWidth + parseFloat(getComputedStyle(elem).marginRight)
        }, 0) + burgerWidth

        if (widthMenu < widthAllItems) {
            const lastItem = menuItems[menuItems.length-1]
            lastWidthItem = lastItem.offsetWidth+parseFloat(getComputedStyle(lastItem).marginRight)
            burgerList.append(lastItem)
            return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList)
        }
    }


    window.amenu = (selectorMenu, selectorMenuList, selectorItemsMenu, selectorBurgerMenu) => {
        const menu = document.querySelector(selectorMenu)
        const menuList = document.querySelector(selectorMenuList)
        const itemsMenu = document.querySelectorAll(selectorItemsMenu)
        const burgerMenu = document.querySelector(selectorBurgerMenu)

        init(menu, menuList, itemsMenu, burgerMenu)
    }


})()