import axios from 'axios';
import sourceMap from 'source-map-js';

const getSourceMap = async (sourceUrl: string) => {
    const response = await axios.get(sourceUrl);
    return response;
}

const findCodeBySourceMap = async (stackFrame: any) => {
    // 获取map文件
    // 这里getSourceMap的url在实际开发请款来说是专门放到一个服务器上,然后通过url去获取
    const sourceData: any = await getSourceMap(stackFrame.fileName + '.map');
    const fileContent = sourceData.data;
    const consumer = await new sourceMap.SourceMapConsumer(fileContent);
    // 通过报错的位置查找对应的源文件的名称以及报错行数
    const originalPosition = consumer.originalPositionFor({
        line: stackFrame.lineNumber,
        column: stackFrame.columnNumber
    });
    
    // 那么就可以通过 sourceContentFor 这个方法找到报错的源代码
    const code = consumer.sourceContentFor(originalPosition.source)
    console.log(code, '还原之后的 code')
}

export { findCodeBySourceMap }