"use client";

import { useUserId } from "@/app/context/UserContext";
import { useChats } from "@/app/hooks/useChats";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateChatModal({ onClose }: { onClose: () => void }) {
    const userId = useUserId();
    const { createChat } = useChats();

    const schema = Yup.object({
        otherId: Yup.string()
            .uuid("Debe ser un UUID válido")
            .required("Campo obligatorio"),
    });

    function handleClick(values: { otherId: string }) {
        const chatId = [userId, values.otherId].sort().join("_");
        createChat(chatId);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#ededed] dark:bg-[#0f0f12] border-2 border-neutral-300 dark:border-neutral-700 p-6 rounded-xl shadow-xl w-80">

                <h2 className="text-xl font-semibold text-center mb-4">
                    Nuevo chat
                </h2>

                <Formik
                    initialValues={{ otherId: "" }}
                    validationSchema={schema}
                    onSubmit={handleClick}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4">

                            <div className="flex flex-col gap-1">
                                <label className="text-sm">UUID del usuario</label>

                                <Field
                                    name="otherId"
                                    className="p-2 rounded-md 
                                    bg-gray-100 dark:bg-gray-800 
                                    border border-gray-300 dark:border-gray-700 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-blue-500"
                                />

                                <ErrorMessage
                                    name="otherId"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="p-2 rounded-md
                                transition-colors duration-150
                                cursor-pointer
                                bg-gray-100 dark:bg-gray-800 
                                hover:bg-gray-200 hover:dark:bg-gray-700 
                                transition-colors duration-150"
                            >
                                Crear chat
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 rounded-md  
                                transition-colors duration-150
                                cursor-pointer
                                bg-red-300 dark:bg-red-900 
                                hover:bg-red-200 hover:dark:bg-red-700 
                                transition-colors duration-150"
                            >
                                Cancelar
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
