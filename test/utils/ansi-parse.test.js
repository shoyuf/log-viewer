import {ansi} from '@/utils'
describe('ansicolor', () => {
  it('解释日志字符串为可读数据', () => {
    const log =
      'normal\x1b[30mcolor is black\x1b[0m\x1b[31;1mcolor is red and bold is true\x1b[0m\x1b[32;3mcolor is green and italic is true\x1b[0m\x1b[33;4mcolor is yellow and underline is true\x1b[0m\x1b[30;47mcolor is black and background is white\x1b[0m\x1b[30;39mcolor is reset\x1b[0m\x1b[40;49mbackground is reset\x1b[0m\x1b[1;22mbold is false\x1b[0m\x1b[3;23mitalic is false\x1b[0m\x1b[4;24munderline is false\x1b[0m'
    const result = ansi.parse(log).spans
    expect(result[0]).toMatchObject({css: '', text: 'normal'})
    expect(result[1]).toMatchObject({
      css: 'color:rgba(0,0,0,1);',
      color: {name: 'black'},
      text: 'color is black'
    })
    expect(result[2]).toMatchObject({
      css: 'font-weight: bold;color:rgba(252,57,31,1);',
      bold: true,
      color: {name: 'red', bright: true},
      text: 'color is red and bold is true'
    })
    expect(result[3]).toMatchObject({
      css: 'font-style: italic;color:rgba(37,188,36,1);',
      color: {name: 'green'},
      text: 'color is green and italic is true',
      italic: true
    })
    expect(result[4]).toMatchObject({
      css: 'text-decoration: underline;color:rgba(173,173,39,1);',
      color: {name: 'yellow'},
      text: 'color is yellow and underline is true',
      underline: true
    })
    expect(result[5]).toMatchObject({
      css: 'color:rgba(0,0,0,1);background:rgba(242,242,242,1);',
      color: {name: 'black'},
      bgColor: {name: 'lightGray'},
      text: 'color is black and background is white'
    })
    expect(result[6]).toMatchObject({css: '', text: 'color is reset'})
    expect(result[7]).toMatchObject({css: '', text: 'background is reset'})
    expect(result[8]).toMatchObject({css: '', text: 'bold is false'})
    expect(result[9]).toMatchObject({css: '', text: 'italic is false'})
    expect(result[10]).toMatchObject({css: '', text: 'underline is false'})
  })
})
