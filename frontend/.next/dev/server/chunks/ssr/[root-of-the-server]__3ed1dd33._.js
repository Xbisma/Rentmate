module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/context/PropertyContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertyProvider",
    ()=>PropertyProvider,
    "useProperty",
    ()=>useProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../services/propertyService'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
'use client';
;
;
;
const PropertyContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function PropertyProvider({ children }) {
    const [properties, setProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get user role from localStorage
    const getUserRole = ()=>{
        return localStorage.getItem('userType');
    };
    // Fetch properties based on user role
    const fetchProperties = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const userRole = getUserRole();
            let data;
            if (userRole === 'owner') {
                data = await getOwnerProperties();
            } else if (userRole === 'tenant') {
                data = await getTenantProperties();
            } else {
                data = await getAllProperties();
            }
            setProperties(data);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError('Failed to load properties');
            showNotification('Failed to load properties. Please try again.', 'error');
        } finally{
            setLoading(false);
        }
    };
    // Show notification
    const showNotification = (message, type = 'success')=>{
        setNotification({
            message,
            type
        });
        setTimeout(()=>setNotification(null), 5000);
    };
    // Add property
    const addProperty = async (propertyData)=>{
        setLoading(true);
        try {
            const newProperty = await apiAddProperty(propertyData);
            setProperties((prev)=>[
                    ...prev,
                    newProperty
                ]);
            showNotification('Property added successfully!');
            return newProperty;
        } catch (err) {
            console.error('Error adding property:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add property';
            showNotification(errorMessage, 'error');
            throw err;
        } finally{
            setLoading(false);
        }
    };
    // Update property
    const updateProperty = async (id, propertyData)=>{
        setLoading(true);
        try {
            const updatedProperty = await apiUpdateProperty(id, propertyData);
            setProperties((prev)=>prev.map((prop)=>prop._id === id ? updatedProperty : prop));
            showNotification('Property updated successfully!');
            return updatedProperty;
        } catch (err) {
            console.error('Error updating property:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update property';
            showNotification(errorMessage, 'error');
            throw err;
        } finally{
            setLoading(false);
        }
    };
    // Delete property
    const deleteProperty = async (id)=>{
        setLoading(true);
        try {
            await apiDeleteProperty(id);
            setProperties((prev)=>prev.filter((prop)=>prop._id !== id));
            showNotification('Property deleted successfully!');
        } catch (err) {
            console.error('Error deleting property:', err);
            const errorMessage = err.response?.data?.message || 'Failed to delete property';
            showNotification(errorMessage, 'error');
            throw err;
        } finally{
            setLoading(false);
        }
    };
    // Get single property
    const fetchPropertyById = async (id)=>{
        setLoading(true);
        try {
            const property = await getPropertyById(id);
            return property;
        } catch (err) {
            console.error('Error fetching property:', err);
            setError('Failed to load property');
            throw err;
        } finally{
            setLoading(false);
        }
    };
    // Filter properties
    const filterPropertiesData = async (filters)=>{
        setLoading(true);
        try {
            const filteredData = await filterProperties(filters);
            setProperties(filteredData);
            return filteredData;
        } catch (err) {
            console.error('Error filtering properties:', err);
            setError('Failed to filter properties');
            throw err;
        } finally{
            setLoading(false);
        }
    };
    // Load properties on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            fetchProperties();
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PropertyContext.Provider, {
        value: {
            properties,
            loading,
            error,
            notification,
            setNotification,
            addProperty,
            updateProperty,
            deleteProperty,
            fetchPropertyById,
            filterProperties: filterPropertiesData,
            fetchProperties,
            showNotification
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/PropertyContext.js",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
const useProperty = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PropertyContext);
    if (!context) {
        throw new Error('useProperty must be used within a PropertyProvider');
    }
    return context;
};
}),
"[project]/app/provider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/providers.js
__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$PropertyContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/PropertyContext.js [app-ssr] (ecmascript)");
"use client"; // This makes it a client component
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$PropertyContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertyProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/provider.js",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3ed1dd33._.js.map