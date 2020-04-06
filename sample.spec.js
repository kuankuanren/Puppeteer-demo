describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa Todo');
    })
     
    //测试完成某待办事项
describe('should complete this todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto("http://127.0.0.1:7001");
    });
  
    after (async function () {
      await page.close();
    });

    it('should clicked correct', async function() {
        page.evaluate(() => {
          let elements = document.getElementsByClassName('toggle');
          elements[elements.length - 1].click();
          console.log(elements.length - 1);
        });
      })
    it('should complete todo correct', async function() {
        let todoList = await page.waitFor('#todo-list');
        const expectStatus = await page.evaluate(todoList => todoList.lastChild.querySelector('input').checked, todoList);
        expect(expectStatus).to.eql(true);
    })
})
   
    //测试展示待办事项
describe('should render todoList', function() {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto("http://127.0.0.1:7001");
    });
  
    after (async function () {
      await page.close();
    });

    it('should render todoList correct', async function() {
        const todoListLength = await page.evaluate(() => {
            return document.getElementsByClassName('view').length;
        });
        const doneListLength = await page.evaluate(() => {
            return document.getElementsByClassName('completed').length;
        });
        let todoCount = await page.waitFor('#todo-count');
        const count = await page.evaluate(todoCount => todoCount.querySelector('strong').textContent, todoCount)
        expect(todoListLength - doneListLength).to.eql(+count);
    })
})
  });
