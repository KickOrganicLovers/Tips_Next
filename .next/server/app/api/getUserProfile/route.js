/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/getUserProfile/route";
exports.ids = ["app/api/getUserProfile/route"];
exports.modules = {

/***/ "(rsc)/./app/api/getUserProfile/route.ts":
/*!*****************************************!*\
  !*** ./app/api/getUserProfile/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_server_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib-server/prisma */ \"(rsc)/./lib-server/prisma.ts\");\n/* harmony import */ var _lib_server_processing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib-server/processing */ \"(rsc)/./lib-server/processing.ts\");\n\n\n\nasync function GET(req) {\n    const { searchParams } = new URL(req.url);\n    // クエリパラメータ \"id\" を取得\n    const userId = searchParams.get(\"userId\");\n    try {\n        const userProfile = await _lib_server_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.userProfile.findUnique({\n            where: {\n                userId: userId\n            },\n            include: {\n                likes: true,\n                followers: true,\n                followings: true,\n                articleCreatedBy: {\n                    include: {\n                        likes: true,\n                        authorProfile: true,\n                        category: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            userProfile: (0,_lib_server_processing__WEBPACK_IMPORTED_MODULE_2__.replaceAllDatesToIsoString)(userProfile),\n            error: undefined\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            userProfile: undefined,\n            error: error\n        }, {\n            status: 400\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dldFVzZXJQcm9maWxlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBc0Q7QUFDWDtBQUN3QjtBQUU1RCxlQUFlRyxJQUFJQyxHQUFnQjtJQUV0QyxNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLElBQUlHLEdBQUc7SUFDeEMsb0JBQW9CO0lBQ3BCLE1BQU1DLFNBQVNILGFBQWFJLEdBQUcsQ0FBQztJQUVoQyxJQUFJO1FBQ0EsTUFBTUMsY0FBYyxNQUFNVCxzREFBTUEsQ0FBQ1MsV0FBVyxDQUFDQyxVQUFVLENBQUM7WUFDcERDLE9BQU87Z0JBQ0hKLFFBQVFBO1lBQ1o7WUFDQUssU0FBUztnQkFDTEMsT0FBTztnQkFDUEMsV0FBVztnQkFDWEMsWUFBWTtnQkFDWkMsa0JBQWtCO29CQUNkSixTQUFTO3dCQUNMQyxPQUFPO3dCQUNQSSxlQUFlO3dCQUNmQyxVQUFVO29CQUNkO2dCQUNKO1lBQ0o7UUFDSjtRQUNBLE9BQU9uQixxREFBWUEsQ0FBQ29CLElBQUksQ0FBQztZQUFDVixhQUFhUixrRkFBMEJBLENBQUNRO1lBQWNXLE9BQU9DO1FBQVMsR0FBRztZQUFDQyxRQUFRO1FBQUc7SUFDbkgsRUFBQyxPQUFPRixPQUFNO1FBQ1YsT0FBT3JCLHFEQUFZQSxDQUFDb0IsSUFBSSxDQUFDO1lBQUNWLGFBQWFZO1lBQVdELE9BQU9BO1FBQUssR0FBRztZQUFDRSxRQUFRO1FBQUc7SUFDakY7QUFDSiIsInNvdXJjZXMiOlsiRTpcXEFzc2V0c1xcV2ViU3Rvcm1cXFByb2plY3RzXFxUaXBzX05leHRcXGFwcFxcYXBpXFxnZXRVc2VyUHJvZmlsZVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHtwcmlzbWF9IGZyb20gXCJAL2xpYi1zZXJ2ZXIvcHJpc21hXCI7XHJcbmltcG9ydCB7cmVwbGFjZUFsbERhdGVzVG9Jc29TdHJpbmd9IGZyb20gXCJAL2xpYi1zZXJ2ZXIvcHJvY2Vzc2luZ1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcblxyXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxLnVybCk7XHJcbiAgICAvLyDjgq/jgqjjg6rjg5Hjg6njg6Hjg7zjgr8gXCJpZFwiIOOCkuWPluW+l1xyXG4gICAgY29uc3QgdXNlcklkID0gc2VhcmNoUGFyYW1zLmdldChcInVzZXJJZFwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJQcm9maWxlID0gYXdhaXQgcHJpc21hLnVzZXJQcm9maWxlLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySWQgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgICBsaWtlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZvbGxvd2VyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZvbGxvd2luZ3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlQ3JlYXRlZEJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWtlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yUHJvZmlsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe3VzZXJQcm9maWxlOiByZXBsYWNlQWxsRGF0ZXNUb0lzb1N0cmluZyh1c2VyUHJvZmlsZSksIGVycm9yOiB1bmRlZmluZWR9LCB7c3RhdHVzOiAyMDB9KVxyXG4gICAgfWNhdGNoIChlcnJvcil7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHt1c2VyUHJvZmlsZTogdW5kZWZpbmVkLCBlcnJvcjogZXJyb3J9LCB7c3RhdHVzOiA0MDB9KVxyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJyZXBsYWNlQWxsRGF0ZXNUb0lzb1N0cmluZyIsIkdFVCIsInJlcSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInVzZXJJZCIsImdldCIsInVzZXJQcm9maWxlIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaW5jbHVkZSIsImxpa2VzIiwiZm9sbG93ZXJzIiwiZm9sbG93aW5ncyIsImFydGljbGVDcmVhdGVkQnkiLCJhdXRob3JQcm9maWxlIiwiY2F0ZWdvcnkiLCJqc29uIiwiZXJyb3IiLCJ1bmRlZmluZWQiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/getUserProfile/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib-server/prisma.ts":
/*!******************************!*\
  !*** ./lib-server/prisma.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWItc2VydmVyL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRztBQUVuRSxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIkU6XFxBc3NldHNcXFdlYlN0b3JtXFxQcm9qZWN0c1xcVGlwc19OZXh0XFxsaWItc2VydmVyXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBwcmlzbWE/OiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib-server/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib-server/processing.ts":
/*!**********************************!*\
  !*** ./lib-server/processing.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   extractBase64Images: () => (/* binding */ extractBase64Images),\n/* harmony export */   extractImageUrls: () => (/* binding */ extractImageUrls),\n/* harmony export */   extractKeyFromUrl: () => (/* binding */ extractKeyFromUrl),\n/* harmony export */   replaceAllDatesToIsoString: () => (/* binding */ replaceAllDatesToIsoString),\n/* harmony export */   replaceImageSrc: () => (/* binding */ replaceImageSrc)\n/* harmony export */ });\n/* harmony import */ var jsdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsdom */ \"jsdom\");\n/* harmony import */ var jsdom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsdom__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction extractBase64Images(html) {\n    const jsdom = new jsdom__WEBPACK_IMPORTED_MODULE_0__.JSDOM();\n    const parser = new jsdom.window.DOMParser();\n    const doc = parser.parseFromString(html, \"text/html\");\n    const images = Array.from(doc.querySelectorAll('img'));\n    return images.map((img)=>img.getAttribute('src')).filter((src)=>!!src && src.startsWith('data:image/'));\n}\nfunction extractImageUrls(html) {\n    console.log('this is from extractImageUrls');\n    const jsdom = new jsdom__WEBPACK_IMPORTED_MODULE_0__.JSDOM();\n    const parser = new jsdom.window.DOMParser();\n    const doc = parser.parseFromString(html, \"text/html\");\n    const images = Array.from(doc.querySelectorAll('img'));\n    console.log(images);\n    return images.map((img)=>img.getAttribute('src')).filter((src)=>!!src && src.startsWith('http://'));\n}\nfunction extractKeyFromUrl(url) {\n    try {\n        const parsedUrl = new URL(url);\n        const pathParts = parsedUrl.pathname.split('/');\n        if (pathParts.length < 3) {\n            console.error(\"Invalid MinIO URL format\");\n        }\n        // MinIO は基本的にパス形式なので、バケット名をスキップしてキーを取得\n        const [, , ...keyParts] = pathParts;\n        return keyParts.join('/');\n    } catch (error) {\n        console.error(\"Invalid URL:\", error);\n        return null;\n    }\n}\nfunction replaceImageSrc(html, replacements) {\n    const dom = new jsdom__WEBPACK_IMPORTED_MODULE_0__.JSDOM(html);\n    const document = dom.window.document;\n    const imgTags = document.querySelectorAll(\"img\");\n    imgTags.forEach((img)=>{\n        const src = img.getAttribute(\"src\");\n        const replacement = replacements.find((r)=>r.base64 === src);\n        if (replacement) {\n            img.setAttribute(\"src\", replacement.s3Url);\n        }\n    });\n    console.log(dom.serialize());\n    return dom.window.document.body.innerHTML; // 変更後のHTMLを取得\n}\nfunction replaceAllDatesToIsoString(obj) {\n    if (obj === null || typeof obj !== \"object\") {\n        return obj;\n    }\n    if (obj instanceof Date) {\n        return obj.toISOString(); // DateならISO文字列に変換\n    }\n    if (Array.isArray(obj)) {\n        return obj.map((item)=>replaceAllDatesToIsoString(item));\n    }\n    return Object.fromEntries(Object.entries(obj).map(([key, value])=>[\n            key,\n            replaceAllDatesToIsoString(value)\n        ]));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQkQsT0FBT0UsT0FBTyxDQUFDUCxLQUFLcEMsR0FBRyxDQUFDLENBQUMsQ0FBQzRDLEtBQUtDLE1BQU0sR0FBSztZQUFDRDtZQUFLVCwyQkFBMkJVO1NBQU87QUFFMUYiLCJzb3VyY2VzIjpbIkU6XFxBc3NldHNcXFdlYlN0b3JtXFxQcm9qZWN0c1xcVGlwc19OZXh0XFxsaWItc2VydmVyXFxwcm9jZXNzaW5nLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SlNET019IGZyb20gXCJqc2RvbVwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QmFzZTY0SW1hZ2VzKGh0bWw6IHN0cmluZykge1xyXG4gICAgY29uc3QganNkb20gPSBuZXcgSlNET00oKVxyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IGpzZG9tLndpbmRvdy5ET01QYXJzZXIoKVxyXG5cclxuICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSk7XHJcblxyXG4gICAgcmV0dXJuIGltYWdlc1xyXG4gICAgICAgIC5tYXAoKGltZykgPT4gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykpXHJcbiAgICAgICAgLmZpbHRlcigoc3JjKTogc3JjIGlzIHN0cmluZyA9PiAhIXNyYyAmJiBzcmMuc3RhcnRzV2l0aCgnZGF0YTppbWFnZS8nKSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0SW1hZ2VVcmxzKGh0bWw6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2coJ3RoaXMgaXMgZnJvbSBleHRyYWN0SW1hZ2VVcmxzJyk7XHJcbiAgICBjb25zdCBqc2RvbSA9IG5ldyBKU0RPTSgpXHJcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcganNkb20ud2luZG93LkRPTVBhcnNlcigpXHJcblxyXG4gICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKTtcclxuICAgIGNvbnN0IGltYWdlcyA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcclxuICAgIGNvbnNvbGUubG9nKGltYWdlcylcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VzXHJcbiAgICAgICAgLm1hcCgoaW1nKSA9PiBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKSlcclxuICAgICAgICAuZmlsdGVyKChzcmMpOiBzcmMgaXMgc3RyaW5nID0+ICEhc3JjICYmIHNyYy5zdGFydHNXaXRoKCdodHRwOi8vJykpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5RnJvbVVybCh1cmw6IHN0cmluZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybCk7XHJcbiAgICAgICAgY29uc3QgcGF0aFBhcnRzID0gcGFyc2VkVXJsLnBhdGhuYW1lLnNwbGl0KCcvJyk7XHJcblxyXG4gICAgICAgIGlmIChwYXRoUGFydHMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBNaW5JTyBVUkwgZm9ybWF0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWluSU8g44Gv5Z+65pys55qE44Gr44OR44K55b2i5byP44Gq44Gu44Gn44CB44OQ44Kx44OD44OI5ZCN44KS44K544Kt44OD44OX44GX44Gm44Kt44O844KS5Y+W5b6XXHJcbiAgICAgICAgY29uc3QgWywgLCAuLi5rZXlQYXJ0c10gPSBwYXRoUGFydHM7XHJcbiAgICAgICAgcmV0dXJuIGtleVBhcnRzLmpvaW4oJy8nKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgVVJMOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUltYWdlU3JjKGh0bWw6IHN0cmluZywgcmVwbGFjZW1lbnRzOiB7IGJhc2U2NDogc3RyaW5nOyBzM1VybDogc3RyaW5nIH1bXSkge1xyXG4gICAgY29uc3QgZG9tID0gbmV3IEpTRE9NKGh0bWwpO1xyXG4gICAgY29uc3QgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xyXG4gICAgY29uc3QgaW1nVGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIik7XHJcblxyXG4gICAgaW1nVGFncy5mb3JFYWNoKChpbWcpID0+IHtcclxuICAgICAgICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xyXG4gICAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnRzLmZpbmQociA9PiByLmJhc2U2NCA9PT0gc3JjKTtcclxuICAgICAgICBpZiAocmVwbGFjZW1lbnQpIHtcclxuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCByZXBsYWNlbWVudC5zM1VybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coZG9tLnNlcmlhbGl6ZSgpKTtcclxuXHJcbiAgICByZXR1cm4gZG9tLndpbmRvdy5kb2N1bWVudC5ib2R5LmlubmVySFRNTDsgLy8g5aSJ5pu05b6M44GuSFRNTOOCkuWPluW+l1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbERhdGVzVG9Jc29TdHJpbmc8VD4ob2JqOiBUKTogVCB7XHJcbiAgICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai50b0lTT1N0cmluZygpIGFzIFQ7IC8vIERhdGXjgarjgolJU0/mloflrZfliJfjgavlpInmj5tcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5tYXAoKGl0ZW0pID0+IHJlcGxhY2VBbGxEYXRlc1RvSXNvU3RyaW5nKGl0ZW0pKSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMob2JqKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gW2tleSwgcmVwbGFjZUFsbERhdGVzVG9Jc29TdHJpbmcodmFsdWUpXSlcclxuICAgICkgYXMgVDtcclxufVxyXG4iXSwibmFtZXMiOlsiSlNET00iLCJleHRyYWN0QmFzZTY0SW1hZ2VzIiwiaHRtbCIsImpzZG9tIiwicGFyc2VyIiwid2luZG93IiwiRE9NUGFyc2VyIiwiZG9jIiwicGFyc2VGcm9tU3RyaW5nIiwiaW1hZ2VzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIm1hcCIsImltZyIsImdldEF0dHJpYnV0ZSIsImZpbHRlciIsInNyYyIsInN0YXJ0c1dpdGgiLCJleHRyYWN0SW1hZ2VVcmxzIiwiY29uc29sZSIsImxvZyIsImV4dHJhY3RLZXlGcm9tVXJsIiwidXJsIiwicGFyc2VkVXJsIiwiVVJMIiwicGF0aFBhcnRzIiwicGF0aG5hbWUiLCJzcGxpdCIsImxlbmd0aCIsImVycm9yIiwia2V5UGFydHMiLCJqb2luIiwicmVwbGFjZUltYWdlU3JjIiwicmVwbGFjZW1lbnRzIiwiZG9tIiwiZG9jdW1lbnQiLCJpbWdUYWdzIiwiZm9yRWFjaCIsInJlcGxhY2VtZW50IiwiZmluZCIsInIiLCJiYXNlNjQiLCJzZXRBdHRyaWJ1dGUiLCJzM1VybCIsInNlcmlhbGl6ZSIsImJvZHkiLCJpbm5lckhUTUwiLCJyZXBsYWNlQWxsRGF0ZXNUb0lzb1N0cmluZyIsIm9iaiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImlzQXJyYXkiLCJpdGVtIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwia2V5IiwidmFsdWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib-server/processing.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgetUserProfile%2Froute&page=%2Fapi%2FgetUserProfile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgetUserProfile%2Froute.ts&appDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgetUserProfile%2Froute&page=%2Fapi%2FgetUserProfile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgetUserProfile%2Froute.ts&appDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_Assets_WebStorm_Projects_Tips_Next_app_api_getUserProfile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/getUserProfile/route.ts */ \"(rsc)/./app/api/getUserProfile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/getUserProfile/route\",\n        pathname: \"/api/getUserProfile\",\n        filename: \"route\",\n        bundlePath: \"app/api/getUserProfile/route\"\n    },\n    resolvedPagePath: \"E:\\\\Assets\\\\WebStorm\\\\Projects\\\\Tips_Next\\\\app\\\\api\\\\getUserProfile\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_Assets_WebStorm_Projects_Tips_Next_app_api_getUserProfile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZXRVc2VyUHJvZmlsZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ2V0VXNlclByb2ZpbGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnZXRVc2VyUHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDQXNzZXRzJTVDV2ViU3Rvcm0lNUNQcm9qZWN0cyU1Q1RpcHNfTmV4dCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RSUzQSU1Q0Fzc2V0cyU1Q1dlYlN0b3JtJTVDUHJvamVjdHMlNUNUaXBzX05leHQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzZCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJFOlxcXFxBc3NldHNcXFxcV2ViU3Rvcm1cXFxcUHJvamVjdHNcXFxcVGlwc19OZXh0XFxcXGFwcFxcXFxhcGlcXFxcZ2V0VXNlclByb2ZpbGVcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dldFVzZXJQcm9maWxlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2V0VXNlclByb2ZpbGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2dldFVzZXJQcm9maWxlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRTpcXFxcQXNzZXRzXFxcXFdlYlN0b3JtXFxcXFByb2plY3RzXFxcXFRpcHNfTmV4dFxcXFxhcHBcXFxcYXBpXFxcXGdldFVzZXJQcm9maWxlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgetUserProfile%2Froute&page=%2Fapi%2FgetUserProfile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgetUserProfile%2Froute.ts&appDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "jsdom":
/*!************************!*\
  !*** external "jsdom" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsdom");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgetUserProfile%2Froute&page=%2Fapi%2FgetUserProfile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgetUserProfile%2Froute.ts&appDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAssets%5CWebStorm%5CProjects%5CTips_Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();