(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/PropertyCard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
const PropertyCard = ({ property })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-red-500 text-white text-xs font-bold px-2 py-1 rounded",
                            children: "HOT"
                        }, void 0, false, {
                            fileName: "[project]/app/components/PropertyCard.js",
                            lineNumber: 10,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 9,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-48 relative overflow-hidden",
                        children: [
                            property.images && property.images.length > 0 ? // Show actual property image from your data
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: property.images[0],
                                alt: property.type,
                                className: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
                                onError: (e)=>{
                                    // Fallback if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/PropertyCard.js",
                                lineNumber: 19,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-48 bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center ${property.images && property.images.length > 0 ? 'hidden' : 'flex'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl mb-2",
                                            children: "🏠"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PropertyCard.js",
                                            lineNumber: 38,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium",
                                            children: "Property Image"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PropertyCard.js",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        property.images && property.images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs mt-2 opacity-75",
                                            children: [
                                                "Image URL: ",
                                                property.images[0]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/PropertyCard.js",
                                            lineNumber: 41,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PropertyCard.js",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/components/PropertyCard.js",
                                lineNumber: 32,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PropertyCard.js",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl font-bold text-blue-600 mb-2",
                        children: [
                            property.currency,
                            " ",
                            property.price.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-800 mb-2 line-clamp-2",
                        children: property.location
                    }, void 0, false, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-600 text-sm mb-4",
                        children: [
                            property.type,
                            " • ",
                            property.purpose
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 text-sm text-gray-600 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    "🛏️ ",
                                    property.bedrooms,
                                    " Bed"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/PropertyCard.js",
                                lineNumber: 68,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    "🚿 ",
                                    property.bathrooms,
                                    " Bath"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/PropertyCard.js",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    "📐 ",
                                    property.area,
                                    " ",
                                    property.areaUnit
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/PropertyCard.js",
                                lineNumber: 74,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 67,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500 mb-4",
                        children: [
                            "Added ",
                            property.added
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    property.images && property.images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400 mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "cursor-pointer",
                                    children: "View Image URLs"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/PropertyCard.js",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 space-y-1",
                                    children: property.images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "break-all",
                                            children: [
                                                "Image ",
                                                index + 1,
                                                ": ",
                                                image
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/app/components/PropertyCard.js",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/PropertyCard.js",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/PropertyCard.js",
                            lineNumber: 87,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 86,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/properties/${property.id}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300",
                            children: "View Details"
                        }, void 0, false, {
                            fileName: "[project]/app/components/PropertyCard.js",
                            lineNumber: 102,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/PropertyCard.js",
                        lineNumber: 101,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PropertyCard.js",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/PropertyCard.js",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PropertyCard;
const __TURBOPACK__default__export__ = PropertyCard;
var _c;
__turbopack_context__.k.register(_c, "PropertyCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/data/properties.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// data/properties.js
__turbopack_context__.s([
    "properties",
    ()=>properties
]);
const properties = [
    {
        id: "1",
        type: "Flat",
        purpose: "For Rent",
        price: 60000,
        currency: "PKR",
        bedrooms: 1,
        bathrooms: 1,
        area: 2.2,
        areaUnit: "Marla",
        location: "Bahria Enclave - Sector G, Bahria Town, Islamabad",
        added: "2 days ago",
        description: "This charming and fully furnished 500 Sq-Ft apartment in Sector G of Bahria Enclave offers a perfect, low-maintenance lifestyle. Ideal for singles, couples, or students, this move-in-ready home provides all the essentials for comfortable living in a prime location.",
        features: [
            "Fully Furnished",
            "Prime Location",
            "Low Maintenance",
            "Security",
            "Parking"
        ],
        images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80",
            "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ]
    },
    {
        id: "2",
        type: "House",
        purpose: "For Rent",
        price: 85000,
        currency: "PKR",
        bedrooms: 3,
        bathrooms: 2,
        area: 5,
        areaUnit: "Marla",
        location: "DHA Phase 6, Karachi",
        added: "5 days ago",
        description: "Spacious 3-bedroom house with modern amenities and beautiful garden. Perfect for families looking for comfort and security in a premium location.",
        features: [
            "Garden",
            "Modern Kitchen",
            "Security",
            "Parking",
            "Near Market"
        ],
        images: [
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
            "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80"
        ]
    },
    {
        id: "3",
        type: "Flat",
        purpose: "For Rent",
        price: 45000,
        currency: "PKR",
        bedrooms: 2,
        bathrooms: 1,
        area: 3.5,
        areaUnit: "Marla",
        location: "Gulberg, Lahore",
        added: "1 day ago",
        description: "Cozy 2-bedroom flat in the heart of Gulberg with great connectivity to major commercial areas and entertainment spots.",
        features: [
            "Central Location",
            "Furnished",
            "Elevator",
            "Security"
        ],
        images: [
            "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
        ]
    },
    // Add more properties here
    {
        id: "4",
        type: "House",
        purpose: "For Rent",
        price: 120000,
        currency: "PKR",
        bedrooms: 4,
        bathrooms: 3,
        area: 8,
        areaUnit: "Marla",
        location: "Sector F-10, Islamabad",
        added: "1 day ago",
        description: "Spacious 4-bedroom house in prime location of Islamabad with modern amenities and beautiful garden.",
        features: [
            "Garden",
            "Modern Kitchen",
            "Security",
            "Parking",
            "Near Market"
        ],
        images: [
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80"
        ]
    },
    {
        id: "5",
        type: "Flat",
        purpose: "For Rent",
        price: 35000,
        currency: "PKR",
        bedrooms: 1,
        bathrooms: 1,
        area: 2,
        areaUnit: "Marla",
        location: "Blue Area, Islamabad",
        added: "3 days ago",
        description: "Cozy 1-bedroom flat in the heart of Blue Area with great connectivity to commercial areas.",
        features: [
            "Central Location",
            "Furnished",
            "Elevator",
            "Security"
        ],
        images: [
            "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80"
        ]
    },
    {
        id: "6",
        type: "Apartment",
        purpose: "For Rent",
        price: 75000,
        currency: "PKR",
        bedrooms: 2,
        bathrooms: 2,
        area: 4,
        areaUnit: "Marla",
        location: "DHA Phase 2, Islamabad",
        added: "1 week ago",
        description: "Modern 2-bedroom apartment with premium finishes in DHA Phase 2.",
        features: [
            "Modern Design",
            "Parking",
            "Security",
            "Balcony"
        ],
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ]
    },
    {
        id: "7",
        type: "House",
        purpose: "For Rent",
        price: 95000,
        currency: "PKR",
        bedrooms: 3,
        bathrooms: 2,
        area: 6,
        areaUnit: "Marla",
        location: "Bahria Town Phase 7, Islamabad",
        added: "2 days ago",
        description: "Beautiful 3-bedroom house in Bahria Town with modern amenities.",
        features: [
            "Garden",
            "Modern Kitchen",
            "Security",
            "Parking"
        ],
        images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
        ]
    },
    {
        id: "8",
        type: "Flat",
        purpose: "For Rent",
        price: 55000,
        currency: "PKR",
        bedrooms: 2,
        bathrooms: 1,
        area: 3,
        areaUnit: "Marla",
        location: "G-11 Markaz, Islamabad",
        added: "4 days ago",
        description: "Well-maintained 2-bedroom flat near G-11 Markaz with all basic amenities.",
        features: [
            "Near Market",
            "Security",
            "Parking"
        ],
        images: [
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/properties/search/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PropertyCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PropertyCard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/properties.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function SearchPageContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [filteredProperties, setFilteredProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeFilters, setActiveFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchPageContent.useEffect": ()=>{
            // Get search parameters from URL
            const filters = {
                city: searchParams.get('city') || '',
                propertyType: searchParams.get('propertyType') || '',
                beds: searchParams.get('beds') || '',
                location: searchParams.get('location') || '',
                minPrice: searchParams.get('minPrice') || '',
                maxPrice: searchParams.get('maxPrice') || '',
                minArea: searchParams.get('minArea') || '',
                maxArea: searchParams.get('maxArea') || ''
            };
            setActiveFilters(filters);
            handleSearch(filters);
        }
    }["SearchPageContent.useEffect"], [
        searchParams
    ]);
    const handleSearch = (filters)=>{
        setLoading(true);
        let filtered = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["properties"];
        // Filter by city (more flexible matching)
        if (filters.city && filters.city !== 'All') {
            filtered = filtered.filter((prop)=>prop.location.toLowerCase().includes(filters.city.toLowerCase()));
        }
        // Filter by property type (more flexible matching)
        if (filters.propertyType && filters.propertyType !== 'Homes') {
            filtered = filtered.filter((prop)=>prop.type.toLowerCase().includes(filters.propertyType.toLowerCase()) || filters.propertyType.toLowerCase().includes(prop.type.toLowerCase()));
        }
        // Filter by bedrooms
        if (filters.beds && filters.beds !== 'All') {
            if (filters.beds === '8+') {
                filtered = filtered.filter((prop)=>prop.bedrooms >= 8);
            } else {
                filtered = filtered.filter((prop)=>prop.bedrooms === parseInt(filters.beds));
            }
        }
        // Filter by location (if provided)
        if (filters.location) {
            filtered = filtered.filter((prop)=>prop.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        // Filter by price range
        if (filters.minPrice && filters.minPrice !== '0' && filters.minPrice !== 'Any') {
            filtered = filtered.filter((prop)=>prop.price >= parseInt(filters.minPrice));
        }
        if (filters.maxPrice && filters.maxPrice !== 'Any') {
            filtered = filtered.filter((prop)=>prop.price <= parseInt(filters.maxPrice));
        }
        // Filter by area range
        if (filters.minArea && filters.minArea !== '0' && filters.minArea !== 'Any') {
            filtered = filtered.filter((prop)=>prop.area >= parseFloat(filters.minArea));
        }
        if (filters.maxArea && filters.maxArea !== 'Any') {
            filtered = filtered.filter((prop)=>prop.area <= parseFloat(filters.maxArea));
        }
        setFilteredProperties(filtered);
        setLoading(false);
    };
    const getActiveFilterCount = ()=>{
        return Object.values(activeFilters).filter((value)=>value && value !== '' && value !== 'All' && value !== 'Homes' && value !== '0' && value !== 'Any').length;
    };
    // Add more sample properties to your data/properties.js
    const additionalProperties = [
        {
            id: "4",
            type: "House",
            purpose: "For Rent",
            price: 120000,
            currency: "PKR",
            bedrooms: 4,
            bathrooms: 3,
            area: 8,
            areaUnit: "Marla",
            location: "Sector F-10, Islamabad",
            added: "1 day ago",
            description: "Spacious 4-bedroom house in prime location of Islamabad with modern amenities and beautiful garden.",
            features: [
                "Garden",
                "Modern Kitchen",
                "Security",
                "Parking",
                "Near Market"
            ],
            images: [
                "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80"
            ]
        },
        {
            id: "5",
            type: "Flat",
            purpose: "For Rent",
            price: 35000,
            currency: "PKR",
            bedrooms: 1,
            bathrooms: 1,
            area: 2,
            areaUnit: "Marla",
            location: "Blue Area, Islamabad",
            added: "3 days ago",
            description: "Cozy 1-bedroom flat in the heart of Blue Area with great connectivity to commercial areas.",
            features: [
                "Central Location",
                "Furnished",
                "Elevator",
                "Security"
            ],
            images: [
                "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80"
            ]
        },
        {
            id: "6",
            type: "Apartment",
            purpose: "For Rent",
            price: 75000,
            currency: "PKR",
            bedrooms: 2,
            bathrooms: 2,
            area: 4,
            areaUnit: "Marla",
            location: "DHA Phase 2, Islamabad",
            added: "1 week ago",
            description: "Modern 2-bedroom apartment with premium finishes in DHA Phase 2.",
            features: [
                "Modern Design",
                "Parking",
                "Security",
                "Balcony"
            ],
            images: [
                "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            ]
        },
        {
            id: "7",
            type: "House",
            purpose: "For Rent",
            price: 95000,
            currency: "PKR",
            bedrooms: 3,
            bathrooms: 2,
            area: 6,
            areaUnit: "Marla",
            location: "Bahria Town Phase 7, Islamabad",
            added: "2 days ago",
            description: "Beautiful 3-bedroom house in Bahria Town with modern amenities.",
            features: [
                "Garden",
                "Modern Kitchen",
                "Security",
                "Parking"
            ],
            images: [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
            ]
        },
        {
            id: "8",
            type: "Flat",
            purpose: "For Rent",
            price: 55000,
            currency: "PKR",
            bedrooms: 2,
            bathrooms: 1,
            area: 3,
            areaUnit: "Marla",
            location: "G-11 Markaz, Islamabad",
            added: "4 days ago",
            description: "Well-maintained 2-bedroom flat near G-11 Markaz with all basic amenities.",
            features: [
                "Near Market",
                "Security",
                "Parking"
            ],
            images: [
                "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80"
            ]
        }
    ];
    // Combine original properties with additional properties
    const allProperties = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["properties"],
        ...additionalProperties
    ];
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center h-64",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 197,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg text-gray-600",
                                children: "Loading properties..."
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/properties/search/page.js",
                        lineNumber: 196,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 195,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/properties/search/page.js",
                lineNumber: 194,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/properties/search/page.js",
            lineNumber: 193,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "content-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.6
                    },
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl md:text-5xl font-bold text-gray-800 mb-4",
                            children: "Discover Your Dream Home"
                        }, void 0, false, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-gray-600 max-w-2xl mx-auto",
                            children: filteredProperties.length > 0 ? `We found ${filteredProperties.length} perfect properties for you` : 'No properties found with current filters'
                        }, void 0, false, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                getActiveFilterCount() > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.9
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    className: "flex flex-wrap gap-2 justify-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium",
                            children: [
                                "Active Filters: ",
                                getActiveFilterCount()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 234,
                            columnNumber: 13
                        }, this),
                        activeFilters.city && activeFilters.city !== 'All' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm",
                            children: [
                                "📍 ",
                                activeFilters.city
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 238,
                            columnNumber: 15
                        }, this),
                        activeFilters.propertyType && activeFilters.propertyType !== 'Homes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm",
                            children: [
                                "🏠 ",
                                activeFilters.propertyType
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 243,
                            columnNumber: 15
                        }, this),
                        activeFilters.beds && activeFilters.beds !== 'All' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm",
                            children: [
                                "🛏️ ",
                                activeFilters.beds,
                                " Beds"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 248,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 229,
                    columnNumber: 11
                }, this),
                filteredProperties.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        delay: 0.3
                    },
                    className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8",
                    children: filteredProperties.map((property, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: index * 0.1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PropertyCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                property: property
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 270,
                                columnNumber: 17
                            }, this)
                        }, property.id, false, {
                            fileName: "[project]/app/properties/search/page.js",
                            lineNumber: 264,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 257,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.9
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    className: "text-center py-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-md mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "🏠"
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 281,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-gray-800 mb-4",
                                children: "No Properties Found"
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 282,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-6",
                                children: "Don't worry! Try adjusting your search criteria to find more options."
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 285,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-6 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-gray-800 mb-3",
                                        children: "Quick Tips:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/properties/search/page.js",
                                        lineNumber: 289,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-gray-600 text-sm space-y-2 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-500 mr-2",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/properties/search/page.js",
                                                        lineNumber: 292,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Try a different city or location"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/properties/search/page.js",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-500 mr-2",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/properties/search/page.js",
                                                        lineNumber: 296,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Adjust your price range"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/properties/search/page.js",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-500 mr-2",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/properties/search/page.js",
                                                        lineNumber: 300,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Consider different property types"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/properties/search/page.js",
                                                lineNumber: 299,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-500 mr-2",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/properties/search/page.js",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Modify number of bedrooms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/properties/search/page.js",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/properties/search/page.js",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 288,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/properties/search/page.js",
                        lineNumber: 280,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 275,
                    columnNumber: 11
                }, this),
                filteredProperties.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        delay: 0.5
                    },
                    className: "text-center mt-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg",
                        children: "Load More Properties"
                    }, void 0, false, {
                        fileName: "[project]/app/properties/search/page.js",
                        lineNumber: 321,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 315,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/properties/search/page.js",
            lineNumber: 208,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/properties/search/page.js",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_s(SearchPageContent, "vqV0rpWN8jd8TwJ+Ft5JTpBPU8Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SearchPageContent;
function SearchPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center h-64",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 338,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg text-gray-600",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/app/properties/search/page.js",
                                lineNumber: 339,
                                columnNumber: 15
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/properties/search/page.js",
                        lineNumber: 337,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/properties/search/page.js",
                    lineNumber: 336,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/properties/search/page.js",
                lineNumber: 335,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/properties/search/page.js",
            lineNumber: 334,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchPageContent, {}, void 0, false, {
            fileName: "[project]/app/properties/search/page.js",
            lineNumber: 345,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/properties/search/page.js",
        lineNumber: 333,
        columnNumber: 5
    }, this);
}
_c1 = SearchPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "SearchPageContent");
__turbopack_context__.k.register(_c1, "SearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_e08fda35._.js.map