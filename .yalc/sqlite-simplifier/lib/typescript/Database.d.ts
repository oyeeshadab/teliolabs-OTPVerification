import { Transaction } from "react-native-sqlite-storage";
import { DatabaseConfig, InsertOptions, SelectOptions, UpdateOptions, DeleteOptions, DropOptions, DatabaseInterface } from "./types";
export declare class Database implements DatabaseInterface {
    private db;
    private config;
    private activeTransactions;
    private enableLogging;
    private lastQuery;
    private readonly QUERY_DEBOUNCE_MS;
    constructor(config: DatabaseConfig, enableLogging?: boolean);
    /**
     * ============================================
     * CONNECT
     * ============================================
     */
    connect(): Promise<void>;
    /**
     * ============================================
     * INSERT
     * ============================================
     */
    insert(options: InsertOptions): Promise<number>;
    /**
     * ============================================
     * SELECT
     * ============================================
     */
    select<T = any>(options: SelectOptions): Promise<T[]>;
    /**
     * ============================================
     * UPDATE
     * ============================================
     */
    update(options: UpdateOptions): Promise<number>;
    /**
     * ============================================
     * DELETE
     * ============================================
     */
    delete(options: DeleteOptions): Promise<number>;
    /**
     * ============================================
     * DROP TABLE
     * ============================================
     */
    drop(options: DropOptions): Promise<void>;
    /**
     * ============================================
     * EXECUTE QUERY
     * ============================================
     */
    executeQuery(sql: string, params?: any[]): Promise<any>;
    /**
     * ============================================
     * MANUAL TRANSACTION
     * ============================================
     */
    transaction(callback: (tx: Transaction) => void): Promise<void>;
    /**
     * ============================================
     * CREATE TABLE
     * ============================================
     */
    createTable(tableName: string, schema: Record<string, string>): Promise<void>;
    /**
     * ============================================
     * SANITIZATION HELPERS
     * ============================================
     */
    private sanitizeIdentifier;
    private sanitizeType;
    /**
     * ============================================
     * CLOSE DATABASE
     * ============================================
     */
    close(): Promise<void>;
    /**
     * ============================================
     * UTILITY METHODS
     * ============================================
     */
    isConnected(): Promise<boolean>;
    setLogging(enabled: boolean): void;
    clearQueryCache(): void;
    /**
     * ============================================
     * ENSURE CONNECTION
     * ============================================
     */
    private ensureConnection;
}
